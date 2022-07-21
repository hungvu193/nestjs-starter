import { Injectable } from '@nestjs/common';
import { User, SerializeUser } from 'src/users/types';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, username: 'hans', password: 'danny' },
    { id: 2, username: 'erik', password: 'erik' },
    { id: 3, username: 'dang', password: 'dang' },
    { id: 4, username: 'hine', password: 'hine' },
  ];

  getUsers() {
    return this.users.map((user) => new SerializeUser(user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
