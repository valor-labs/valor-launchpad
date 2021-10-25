import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { UiModule } from '@valor-launchpad/ui';
import { HeaderComponent } from './header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AutocompleteModule } from '@valor-launchpad/ui';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    UiModule,
    ModalModule,
    AutocompleteModule,
    ReactiveFormsModule,
    ScrollingModule,
  ],
})
export class HeaderModule {}
