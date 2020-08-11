import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { ICreateClass } from './dtos/ICreateClass';
import { ClassesService } from './classes.service';
import { RequestFilters } from './dtos/IRequestFilters';

@Controller('classes')
export class ClassesController {
  constructor(private classesService: ClassesService) {}
  @Post()
  public async create(@Body() data: ICreateClass) {
    const { avatar, name, bio, cost, schedule, subject, whatsapp } = data;

    const newClass = await this.classesService.create({
      avatar,
      name,
      bio,
      cost,
      schedule,
      subject,
      whatsapp,
    });

    return newClass;
  }

  @Get()
  public async index(@Query() filters: RequestFilters) {
    const { subject, time, week_day } = filters;

    const classes = await this.classesService.index({
      week_day,
      time,
      subject,
    });

    return classes;
  }
}
