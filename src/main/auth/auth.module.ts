import { Module, HttpModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.stratefy';
import { ClientRepository } from './client.repository';
import { ReferralService } from 'src/referral/referral.service';

@Module({
  imports: [
    HttpModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'topSecert51',
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED,
      },
    }),
    TypeOrmModule.forFeature([ClientRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService,
    JwtStrategy,
    ReferralService
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule { }
