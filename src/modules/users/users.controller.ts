import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConnectionsService } from './connections.service';
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private connsctionsService: ConnectionsService,
  ) {}

  @Get()
  public async index() {
    const users = await this.usersService.findAll();

    return users;
  }

  @Get('connections')
  public async getConnections() {
    const connections = await this.connsctionsService.index();

    return connections;
  }

  @Post('connections')
  public async createConnection(@Body('user_id') user_id: number) {
    const newConnections = await this.connsctionsService.create(user_id);

    return newConnections;
  }
}
