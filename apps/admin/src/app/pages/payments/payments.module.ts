import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaymentsComponent} from './payments.component';
import {PaymentsRoutingModule} from "./payments-routing.module";

@NgModule({
  declarations: [
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule {
}
