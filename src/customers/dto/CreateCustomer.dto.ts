import { IsEmail, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateCustomerDto {
  @IsEmail()
  email: string;
  @IsNumber()
  id: number;
  @IsNotEmpty()
  name: string;
}