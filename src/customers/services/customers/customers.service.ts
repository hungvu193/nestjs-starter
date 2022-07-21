import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dto/CreateCustomer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'hans@gmail.com',
      name: 'Kate',
    },
    {
      id: 2,
      email: 'vinh@gmail.com',
      name: 'Johnny',
    },
    {
      id: 3,
      email: 'kate@gmail.com',
      name: 'Loco',
    },
  ];
  findCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }

  createCustomer(customerDto: CreateCustomerDto) {
    this.customers.push(customerDto);
  }

  getAllCustomers() {
    return this.customers;
  }
}
