import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeHooksController } from './stripe_hooks.controller';
import { StripeModule } from 'nestjs-stripe';

@Module({
  imports: [
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_KEY,
      apiVersion: '2020-08-27',
    }),
  ],
  controllers: [StripeController, StripeHooksController],
  providers: [],
  exports: [],
})
export class StripeApiModule {}
