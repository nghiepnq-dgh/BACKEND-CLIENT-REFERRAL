import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';
import { ClientRepository } from '../auth/client.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerRepository, ClientRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
