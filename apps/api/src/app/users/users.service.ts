import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly sequelize: Sequelize) {
    // (async () => await this.sequelize.sync({ force: true }))();
  }

  async createUser(createUserDto: CreateUserDto) {
    // this.sequelize.
    return new Promise<User>((resolve) => resolve(new User()));
  }

  async getById(id: string) {
    // this.sequelize.
    return new Promise<User>((resolve) => resolve(new User()));
  }
}
