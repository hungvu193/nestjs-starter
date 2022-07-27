import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    const userDb = await this.userService.findUserByUsername(username);
    if (userDb && userDb.password === password) {
      const matched = comparePassword(password, userDb.password);
      if (matched) {
        return userDb;
      } else {
        console.log('password do not match');
        return null;
      }
    }

    return null;
  }
}
