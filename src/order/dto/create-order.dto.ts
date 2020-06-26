import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
  @ApiProperty()
  price: string;

  @ApiProperty()
  customerId: string;
}
