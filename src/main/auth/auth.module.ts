import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.stratefy';
import { ClientRepository } from './client.repository';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'topSecert51',
      signOptions: {
        expiresIn: 36000000000000,
      },
    }),
    TypeOrmModule.forFeature([ClientRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService,
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule { }
