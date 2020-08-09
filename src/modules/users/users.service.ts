import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/users/entities/users.entity';
import { UsersRepositry } from './dtos/users-repositry.interface';
import { IUserRequest } from './dtos/user.interface';
@Injectable()
export class UsersService implements UsersRepositry {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async findAll(): Promise<User[]> {
    return {} as User[];
  }

  public async create(data: IUserRequest): Promise<User> {
    return {} as User;
  }
}
