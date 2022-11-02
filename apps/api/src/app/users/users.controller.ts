import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public, Resource, Scopes } from 'nest-keycloak-connect';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@Resource(User.name)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Scopes('Create')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  @Public()
  getById(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id);
  }
}
