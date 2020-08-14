import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classes } from './entities/classes.entity';
import { Repository, getConnection } from 'typeorm';
import { ICreateClass } from './dtos/ICreateClass';
import { User } from '@modules/users/entities/users.entity';
import { RequestFilters } from './dtos/IRequestFilters';

import { getMinutes } from 'date-fns';
import { ClassSchedule } from './entities/classSchudule.entity';
import { convertToMinutes } from 'shared/utils/cnvertTominutes';
@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Classes) private classesReposotry: Repository<Classes>,
    @InjectRepository(User) private usersReposotry: Repository<User>,
    @InjectRepository(ClassSchedule)
    private classScheduleRepository: Repository<ClassSchedule>,
  ) {}

  public async create({
    whatsapp,
    subject,
    schedule,
    cost,
    bio,
    name,
    avatar,
  }: ICreateClass): Promise<Classes> {
    const findUser = await this.usersReposotry.findOne({ where: { name } });

    if (findUser) {
      throw new UnauthorizedException('user already exists');
    }

    const queryRunner = getConnection().createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const newUser = queryRunner.manager.create(User, {
        name,
        avatar,
        whatsapp,
        bio,
      });
      const user = await queryRunner.manager.save(newUser);

      const newClass = queryRunner.manager.create(Classes, {
        cost,
        subject,
        user,
      });

      const classes = await queryRunner.manager.save(newClass);

      console.log(classes);

      const formatedSchedule = schedule.map(item => {
        const { from, to, week_day } = item;
        return {
          week_day: Number(week_day),
          from: convertToMinutes(from),
          to: convertToMinutes(to),
          classes: classes,
        };
      });

      const newSchedule = queryRunner.manager.create(
        ClassSchedule,
        formatedSchedule,
      );

      await queryRunner.manager.save(newSchedule);

      await queryRunner.commitTransaction();
      return newClass;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new UnauthorizedException(error.message);
    }
  }

  public async index(filters: RequestFilters) {
    if (!filters.week_day || !filters.subject || !filters.time) {
      throw new BadRequestException('Milsing filters');
    }

    const { subject, time, week_day } = filters;

    const classes = await this.classesReposotry
      .createQueryBuilder('classes')
      .where(qb => {
        const subquery = qb
          .subQuery()
          .from(ClassSchedule, 'class_schedule')
          .where('class_schedule.class_id = classes.id')
          .where('class_schedule.week_day = :week_day', { week_day });

        return 'post.title IN ' + subquery;
      })
      .where('classes.subject = :subject', { subject })
      .innerJoinAndSelect('classes.user', 'users')
      .where('classes.user_id = users.id')
      .getMany();

    return classes;
  }
}
