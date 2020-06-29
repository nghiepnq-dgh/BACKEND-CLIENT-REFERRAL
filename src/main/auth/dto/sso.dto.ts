import { MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SSODto {
  @ApiProperty()
  @MaxLength(20)
  customerId: string;
}
