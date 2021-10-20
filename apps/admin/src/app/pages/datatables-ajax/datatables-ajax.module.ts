import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatablesAjaxRoutingModule } from './datatables-ajax-routing.module';
import { DatatablesAjaxComponent } from './datatables-ajax.component';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiModule } from '@valor-launchpad/ui';
@NgModule({
  declarations: [DatatablesAjaxComponent],
  imports: [
    CommonModule,
    DatatablesAjaxRoutingModule,
    NgxDatatableModule,
    FormsModule,
    UiModule,
  ],
})
export class DatatablesAjaxModule {}
