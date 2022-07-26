import { CreateCustomerDto } from './../../dto/CreateCustomer.dto';
import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {

  }
  //TODO: if you use res and req in your function you can't just return the object, you need to use res to send.
  @Get(":id")
  getCustomer(@Param("id", ParseIntPipe) id: number, @Req() req: Request, @Res() res: Response ) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      res.send(customer)
    } else {
      res.status(400).send({ msg: "Customer not found!"})
    }
  }

  @Get("/search/:id")
  searchCustomerById(@Param("id", ParseIntPipe) id: number) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      return customer;
    } else {
      throw new HttpException("Not found!", HttpStatus.BAD_REQUEST)
    }
  }

  @Get("")
  getAllCustomers() {
    return this.customersService.getAllCustomers();
  }

  @Post("/create")
  @UsePipes(ValidationPipe)
  createCustomer( @Body() createCustomerDto: CreateCustomerDto) {
    this.customersService.createCustomer(createCustomerDto);
  }
}
