import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CountryValidationPipe } from './pipes/validation.pipe';
import { JoiValidationPipe } from './joi/validation.joi';
import { orderSchema } from './joi/schemas/order.schema';
import { OrderDto } from './dto/order.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    if (Math.random() > 0.5) {
      throw new HttpException('Oops', 401);
    }

    return this.appService.getHello();
  }

  @Get('country/:country')
  getAgeInfo(@Param('country', CountryValidationPipe) country: string): string {
    return country;
  }

  @UsePipes(new JoiValidationPipe(orderSchema))
  @Post('/makeorder')
  makeOrder(@Body() body: OrderDto) {
    return body;
  }
}
