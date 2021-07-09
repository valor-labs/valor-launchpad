import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiCardsRoutingModule } from './ui-cards-routing.module';
import { UiCardsComponent } from './ui-cards.component';
import { UiModule } from '@valor-launchpad/ui';


@NgModule({
  declarations: [
    UiCardsComponent
  ],
  imports: [
    CommonModule,
    UiCardsRoutingModule,
    UiModule
  ]
})
export class UiCardsModule { }
