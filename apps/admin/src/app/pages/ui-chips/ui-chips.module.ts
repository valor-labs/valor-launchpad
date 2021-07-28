import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UiChipsRoutingModule} from './ui-chips-routing.module';
import {UiChipsComponent} from './ui-chips.component';
import {FormsModule} from '@angular/forms';
import {NzTagModule} from 'ng-zorro-antd/tag';


@NgModule({
  declarations: [
    UiChipsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UiChipsRoutingModule,
    NzTagModule
  ]
})
export class UiChipsModule {
}
