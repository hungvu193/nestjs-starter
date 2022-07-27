import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { User, SerializeUser } from 'src/users/types';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

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

  createUser(userDto: CreateUserDto) {
    const password = encodePassword(userDto.password);
    console.log('password', password);
    const user = this.userRepository.create({ ...userDto, password });
    return this.userRepository.save(user);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
