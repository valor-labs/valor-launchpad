import {Module} from '@nestjs/common';
import {StripeController} from './stripe.controller';
import {StripeHooksController} from './stripe_hooks.controller';

@Module({
  controllers: [StripeController, StripeHooksController],
  providers: [],
  exports: [],
})
export class StripeApiModule {

}
