import { Controller, Get, HttpException, Inject, Param, HttpStatus, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializeUser } from 'src/users/types';

@Controller('users')
export class UsersController {
  constructor(@Inject('USER_SERVICE') private readonly userServices: UsersService) {

  }
  @Get("")
  getUsers() {
    return this.userServices.getUsers()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/:username")
  getUserByName(@Param('username') username: string) {
    const user = this.userServices.getUserByUsername(username);
    if (user) return new SerializeUser(user);
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
  }
}
