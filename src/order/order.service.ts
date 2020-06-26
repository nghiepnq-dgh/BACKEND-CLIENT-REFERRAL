import { Injectable } from '@nestjs/common';
import { ReferralService } from 'src/referral/referral.service';

@Injectable()
export class OrderService {
    constructor(
        private referralService: ReferralService,
    ){}
  async createOrder(data) {
      const {price, customerId} = data;
      await this.referralService.createOrderReferral(price, customerId)
  }
}
