import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileHomeComponent } from './mobile-home'
import { MobileIntegrationComponent } from './mobile-integration'
import { PaymentComponent, StripeComponent } from './mobile-integration'
import { MobileDetailComponent } from './mobile-detail';
import { MobilePricingComponent } from './mobile-pricing';

const routes: Routes = [{
  path: 'home',
  component: MobileHomeComponent
},
{
  path: 'integrations',
  component: MobileIntegrationComponent,
  children: [
    {
      path: 'stripe',
      component: StripeComponent
    },
    {
      path: 'payment',
      component: PaymentComponent
    },
    {
      path: '',
      redirectTo: 'payment',
      pathMatch: 'full',
    },
  ]
},
{
  path: 'detail',
  component: MobileDetailComponent
},
{
  path: 'pricing',
  component: MobilePricingComponent
},
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
