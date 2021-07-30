import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeHooksController } from './stripe_hooks.controller';
import { StripeModule } from 'nestjs-stripe';
import { StripeService } from './stripe.service';

@Module({
  imports: [
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_KEY,
      apiVersion: '2020-08-27',
      maxNetworkRetries: 3,
    }),
  ],
  controllers: [StripeController, StripeHooksController],
  providers: [StripeService],
  exports: [],
})
export class StripeApiModule {}
