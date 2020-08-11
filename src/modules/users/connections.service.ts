import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connections } from './entities/connections.entity';
import { User } from './entities/users.entity';

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connections)
    private connectionsRepository: Repository<Connections>,
  ) {}

  public async index() {
    const contConnections = await this.connectionsRepository.findAndCount();
    return contConnections;
  }

  public async create(user_id: number) {
    console.log(user_id);

    const newConnection = this.connectionsRepository.create({
      user_id,
    });

    await this.connectionsRepository.save(newConnection);

    return newConnection;
  }
}
