import { ValidateCustomerAccountMiddleware } from './middleware/validate-customer-account.middleware';
import { ValidateCustomerMiddleware } from './middleware/validate-customer.middleware';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
// TODO: https://docs.nestjs.com/middleware
// middleware run sequentially,after calling next() the next middileware will run
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateCustomerMiddleware, ValidateCustomerAccountMiddleware)
      .exclude({
        path: 'api/customers',
        method: RequestMethod.GET,
      })
      .forRoutes(CustomersController);
  }
}
