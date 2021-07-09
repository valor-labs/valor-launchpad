import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsEditorsComponent } from './forms-editors.component';
import { FormsEditorsRoutingModule } from './forms-editors-routing.module';
import { UiModule } from '@valor-launchpad/ui';

@NgModule({
  declarations: [
    FormsEditorsComponent
  ],
  imports: [
    CommonModule,
    FormsEditorsRoutingModule,
    UiModule
  ]
})
export class FormsEditorsModule { }
