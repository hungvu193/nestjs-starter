import {
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { UserNotFoundException } from 'src/users/exception/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filter/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializeUser } from 'src/users/types';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServices: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  getUsers() {
    return this.userServices.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/username/:username')
  getUserByName(@Param('username') username: string) {
    const user = this.userServices.getUserByUsername(username);
    if (user) return new SerializeUser(user);
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/id/:id')
  @UseFilters(HttpExceptionFilter)
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userServices.getUserById(id);
    if (user) {
      return new SerializeUser(user);
    } else
      throw new UserNotFoundException('User not found', HttpStatus.NOT_FOUND);
  }
}
