import { Module, HttpModule } from '@nestjs/common';
import { ReferralService } from './referral.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [ReferralService],
})
export class ReferralModule {}
