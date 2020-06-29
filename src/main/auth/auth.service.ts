import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { userDb } from '../seed/user_db_seed';
import { ClientRepository } from './client.repository';
import { ReferralService } from 'src/referral/referral.service';
import { Config } from 'src/config/configuration';
import { SSODto } from './dto/sso.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ClientRepository)
    private userRepository: ClientRepository,
    private jwtService: JwtService,
    private referralService: ReferralService,
  ) {}

  async findUser(identity: string) {
    const user = this.userRepository.findUserRepository(identity);
    return user;
  }

  async seedUserServicer() {
    const result = await Promise.all(
      userDb.map(async item => {
        return await this.signUp(item);
      }),
    );
    return result;
  }

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const result = await this.userRepository.singUp(authCredentialsDto);
    await this.referralService.createCustomerReferral({
      name: result.name,
      inviterId: authCredentialsDto.inviterId,
      clientCustomerId: result.id,
      email: result.email,
    });
    return result;
  }

  async signIn(authLoginDto: AuthLoginDto): Promise<{ acccessToken: string }> {
    const result = await this.userRepository.validateUserPassword(authLoginDto);
    if (!result) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    const payload: JwtPayload = {
      email: result['email'],
      role: result['role'],
    };
    const acccessToken = await this.jwtService.sign(payload);
    return { acccessToken };
  }

  async ssoService(data: SSODto) {
    const result = await this.referralService.ssoReferral(data.customerId);
    return result;
  }
}
