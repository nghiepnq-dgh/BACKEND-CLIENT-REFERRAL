import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { userDb } from '../seed/user_db_seed';
import { Client } from './client.entity';
import { ClientRepository } from './client.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(ClientRepository)
        private userRepository: ClientRepository,
        private jwtService: JwtService,
    ) { }

    async findUser(identity: string): Promise<Client> {
        const user = this.userRepository.findUserRepository(identity);
        return user;
    }

    async seedUserServicer() {
        const result = await Promise.all(userDb.map(async item => {
            await this.signUp(item);
        }))
        return result;
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<Client> {
        return this.userRepository.singUp(authCredentialsDto);
    }

    async signIn(authLoginDto: AuthLoginDto): Promise<{ acccessToken: string }> {
        const identity = await this.userRepository.validateUserPassword(authLoginDto);
        if (!identity) {
            throw new UnauthorizedException("Sai tài khoản hoặc mật khẩu");
        }

        const payload: JwtPayload = { identity };
        const acccessToken = await this.jwtService.sign(payload);
        return { acccessToken };
    }
}
