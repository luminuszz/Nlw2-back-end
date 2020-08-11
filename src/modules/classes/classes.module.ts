import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classes } from './entities/classes.entity';
import { ClassSchedule } from './entities/classSchudule.entity';
import { UsersModule } from '@modules/users/users.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Classes]),
    TypeOrmModule.forFeature([ClassSchedule]),
    UsersModule,
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [TypeOrmModule],
})
export class ClassesModule {}
