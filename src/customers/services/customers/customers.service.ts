import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
   users = [{
    id: 1,
    email: "hans@gmail.com",
    createdAt: new Date(),
  },
  {
    id: 2,
    email: "vinh@gmail.com",
    createdAt: new Date(),
  },
  {
    id: 3,
    email: "kate@gmail.com",
    createdAt: new Date(),
  }
]
  findCustomerById(id: number) {
    return this.users.find((user) => user.id === id)
  }
}
