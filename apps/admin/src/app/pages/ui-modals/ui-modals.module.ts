import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModalsRoutingModule } from './ui-modals-routing.module';
import { UiModalsComponent } from './ui-modals.component';
import { UiModule } from '@valor-launchpad/ui';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [UiModalsComponent],
  imports: [
    CommonModule,
    UiModalsRoutingModule,
    UiModule,
    ModalModule.forChild(),
  ],
})
export class UiModalsModule {}
