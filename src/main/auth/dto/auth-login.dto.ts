import { IsEmail, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AuthLoginDto {
  @ApiProperty()
  @MaxLength(20)
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
