import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import {UiModule} from "@valor-launchpad/ui";
import { ClientsComponent } from './clients.component';


@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    UiModule
  ]
})
export class ClientsModule { }
