import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaymentsComponent} from "./payments.component";
import {PaymentDefaultComponent} from './payment-default/payment-default.component';

const routes: Routes = [
  {
    path: '', component: PaymentsComponent, children: [
      {path:'', component: PaymentDefaultComponent},
      {path: 'stripe', loadChildren: () => import('@valor-launchpad/stripe-ui').then(m => m.StripeUiModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule {
}
