import { IUserRequest } from './user.interface';
import { User } from '../entities/users.entity';

export interface UsersRepositry {
  findAll(): Promise<User[]>;
  create(data: IUserRequest): Promise<User>;
}
