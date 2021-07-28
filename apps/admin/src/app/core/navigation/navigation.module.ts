import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NavigationRoutingModule} from './navigation-routing.module';
import {NavigationComponent} from './navigation.component';
import {CollapseModule} from "ngx-bootstrap/collapse";
import {NavigationService} from './navigation.service';


@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ],
  providers: [NavigationService],
  imports: [
    CollapseModule,
    CommonModule,
    NavigationRoutingModule
  ]
})
export class NavigationModule {
}
