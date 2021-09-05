import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NavigationRoutingModule} from './navigation-routing.module';
import {NavigationComponent} from './navigation.component';
import {CollapseModule} from "ngx-bootstrap/collapse";
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';


@NgModule({
  declarations: [
    NavigationComponent,
    SidebarItemComponent
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
