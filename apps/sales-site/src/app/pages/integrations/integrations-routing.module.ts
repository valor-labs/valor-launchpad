import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegrationsComponent } from  './integrations.component'
import { StripeComponent } from  './stripe/stripe.component'
import { PaymentComponent } from  './payment/payment.component'

const routes: Routes = [
  {
    path: '',
    component: IntegrationsComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegrationsRoutingModule { }
