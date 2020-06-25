import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, ArrayContains } from 'class-validator';
import { ROLE_USER } from 'src/contants';
export class AuthCredentialsDto {
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @MaxLength(100)
    @IsOptional()
    address: string;

    @IsString()
    @MaxLength(20)
    identity: string;

}