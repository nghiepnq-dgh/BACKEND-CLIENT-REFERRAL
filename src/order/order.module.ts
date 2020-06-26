import { Module, HttpModule } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ReferralService } from 'src/referral/referral.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, ReferralService],
})
export class OrderModule {}
