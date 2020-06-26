import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
@ApiTags('Order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @ApiOperation({
        summary: '[API] Create order - Gọi khi mua sản phẩm',
      })
      @Post()
      async createOrder(@Body() createOrderDto: CreateOrderDto) {
        const result = await this.orderService.createOrder(createOrderDto);
        return { success: true, result };
      }
    
}
