import { IsEmail, MaxLength, Contains } from 'class-validator';
import { USER_ROLE } from 'src/commom/constants';
import { ApiProperty } from '@nestjs/swagger';
export class AuthCredentialsDto {
    @ApiProperty()
    @MaxLength(20)
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @MaxLength(20)
    password: string;

    @MaxLength(100)
    @ApiProperty()
    address: string;

    @MaxLength(100)
    @ApiProperty({default: USER_ROLE.CUSTOMER, enum: USER_ROLE})
    @Contains(USER_ROLE.CUSTOMER)
    role: USER_ROLE;

    @ApiProperty()
    @MaxLength(20)
    identity: string;
}