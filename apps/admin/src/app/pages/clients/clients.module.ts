import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import {UiModule} from "@valor-launchpad/ui";
import { ClientsComponent } from './clients.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    UiModule,
    FormsModule
  ]
})
export class ClientsModule { }
