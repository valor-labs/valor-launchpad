import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsEditorsComponent } from './forms-editors.component';
import { FormsEditorsRoutingModule } from './forms-editors-routing.module';
import { UiModule } from '@valor-launchpad/ui';
import { SlateModule } from 'slate-angular';

@NgModule({
  declarations: [
    FormsEditorsComponent
  ],
  imports: [
    CommonModule,
    FormsEditorsRoutingModule,
    UiModule,
    SlateModule
  ]
})
export class FormsEditorsModule { }
