import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsEditorsComponent } from './forms-editors.component';
import { FormsEditorsRoutingModule } from './forms-editors-routing.module';

@NgModule({
  declarations: [
    FormsEditorsComponent
  ],
  imports: [
    CommonModule,
    FormsEditorsRoutingModule
  ]
})
export class FormsEditorsModule { }
