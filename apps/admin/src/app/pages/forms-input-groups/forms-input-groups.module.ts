import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsInputGroupsComponent } from './forms-input-groups.component';
import { FormsInputGroupsRoutingModule } from './forms-input-groups-routing.module';



@NgModule({
  declarations: [
    FormsInputGroupsComponent
  ],
  imports: [
    CommonModule,
    FormsInputGroupsRoutingModule,
  ]
})
export class FormsInputGroupsModule { }
