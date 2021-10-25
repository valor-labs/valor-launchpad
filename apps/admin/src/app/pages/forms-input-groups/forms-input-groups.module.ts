import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsInputGroupsComponent } from './forms-input-groups.component';
import { FormsInputGroupsRoutingModule } from './forms-input-groups-routing.module';
import { UiModule } from '@valor-launchpad/ui';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [FormsInputGroupsComponent],
  imports: [
    CommonModule,
    UiModule,
    FormsInputGroupsRoutingModule,
    BsDropdownModule,
  ],
})
export class FormsInputGroupsModule {}
