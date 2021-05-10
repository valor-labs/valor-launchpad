import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardCryptoRoutingModule } from './dashboard-crypto-routing.module';
import { DashboardCryptoComponent } from './dashboard-crypto.component';


@NgModule({
  declarations: [
    DashboardCryptoComponent
  ],
  imports: [
    CommonModule,
    DashboardCryptoRoutingModule
  ]
})
export class DashboardCryptoModule { }
