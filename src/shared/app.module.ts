import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@modules/users/users.module';
import { ClassesModule } from '@modules/classes/classes.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, ClassesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
