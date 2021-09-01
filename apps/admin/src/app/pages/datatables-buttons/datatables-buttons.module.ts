import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatatablesButtonsRoutingModule } from './datatables-buttons-routing.module';
import { DatatablesButtonsComponent } from './datatables-buttons.component';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiModule } from '@valor-launchpad/ui';

@NgModule({
  declarations: [
    DatatablesButtonsComponent
  ],
  imports: [
    CommonModule,
    DatatablesButtonsRoutingModule,
    FormsModule,
    NgxDatatableModule,
    UiModule
  ]
})
export class DatatablesButtonsModule { }
