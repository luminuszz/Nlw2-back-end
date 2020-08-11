import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Connections } from './entities/connections.entity';
import { ConnectionsService } from './connections.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Connections]),
  ],
  providers: [UsersService, ConnectionsService],
  controllers: [UsersController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
