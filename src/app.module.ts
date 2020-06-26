import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './main/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';
import { ReferralModule } from './referral/referral.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          auth: {
            user: "testqrtl@gmail.com",
            pass: "01634490536",
          },
        },
        template: {
          dir: path.resolve(__dirname, 'templates'),          
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    ReferralModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
