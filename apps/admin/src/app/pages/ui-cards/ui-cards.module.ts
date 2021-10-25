import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiCardsRoutingModule } from './ui-cards-routing.module';
import { UiCardsComponent } from './ui-cards.component';
import { UiModule } from '@valor-launchpad/ui';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [UiCardsComponent],
  imports: [CommonModule, UiCardsRoutingModule, UiModule, TabsModule],
})
export class UiCardsModule {}
