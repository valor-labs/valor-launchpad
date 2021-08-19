import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@valor-launchpad/ui';
import { FormsAdvancedInputsComponent } from './forms-advanced-inputs.component';
import { FormsAdvancedInputsRoutingModule } from './forms-advanced-inputs-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMaskModule } from 'ngx-mask';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  declarations: [FormsAdvancedInputsComponent],
  imports: [
    CommonModule,
    UiModule,
    FormsAdvancedInputsRoutingModule,
    NgSelectModule,
    BsDatepickerModule,
    NgxMaskModule,
    NzDatePickerModule
  ],
})
export class FormsAdvancedInputsModule {}
