import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DirectPayComponent} from "./direct-pay/direct-pay.component";
import {StripeComponent} from './stripe/stripe.component';
import {EmbeddedPayComponent} from './embedded-pay/embedded-pay.component';

const routes: Routes = [
  {
    path: '', component: StripeComponent, children: [
      {
        path: 'direct', component: DirectPayComponent
      },
      {
        path: 'embedded', component: EmbeddedPayComponent
      },
      {
        path: '', redirectTo: 'embedded', pathMatch: 'full'
      },
    ]
  },
  {
    path: '', redirectTo:'/direct', pathMatch: 'full' //TODO: Figure out why this redirect doesn't work
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StripeUiRoutingModule {
}
