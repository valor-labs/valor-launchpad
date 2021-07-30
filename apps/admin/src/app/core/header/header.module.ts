import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderRoutingModule} from './header-routing.module';
import {HeaderComponent} from './header.component';
import {UiModule} from '@valor-launchpad/ui';
import {NavigationService} from '../navigation/navigation.service';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  providers: [NavigationService],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    UiModule
  ]
})
export class HeaderModule {
}
