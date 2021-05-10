import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NavigationRoutingModule} from './navigation-routing.module';
import {NavigationComponent} from './navigation.component';
import {CollapseModule} from "ngx-bootstrap/collapse";


@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ],
  imports: [
    CollapseModule,
    CommonModule,
    NavigationRoutingModule
  ]
})
export class NavigationModule {
}
