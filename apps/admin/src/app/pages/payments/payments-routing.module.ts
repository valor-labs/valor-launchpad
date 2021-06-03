import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaymentsComponent} from "./payments.component";

const routes: Routes = [
  {
    path: '', component: PaymentsComponent, children: [
      {path: 'stripe', loadChildren: () => import('@valor-launchpad/stripe-ui').then(m => m.StripeUiModule)}
    ]
  },
  {path: '', redirectTo: '/stripe', pathMatch: 'full'} //TODO: Figure out why this redirect doesn't work
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule {
}
