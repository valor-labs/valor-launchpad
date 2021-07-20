import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UiChipsRoutingModule} from './ui-chips-routing.module';
import {UiChipsComponent} from './ui-chips.component';
import {UiModule} from '@valor-launchpad/ui';


@NgModule({
  declarations: [
    UiChipsComponent
  ],
  imports: [
    CommonModule,
    UiChipsRoutingModule,
    UiModule
  ]
})
export class UiChipsModule {
}
