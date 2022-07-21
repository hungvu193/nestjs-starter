import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { User, SerializeUser } from 'src/users/types';

@Injectable()
export class UsersService {
  private users: User[] = [
    {username: "hans", password: "danny"},
    {username: "erik", password: "erik"},
    {username: "dang", password: "dang"},
    {username: "hine", password: "hine"},
  ]

  getUsers() {
    return this.users.map((user) => plainToClass(SerializeUser, user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
