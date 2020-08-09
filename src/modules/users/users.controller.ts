import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public async index() {
    const users = await this.usersService.findAll();

    return users;
  }
}
