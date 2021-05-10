import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiCardsRoutingModule } from './ui-cards-routing.module';
import { UiCardsComponent } from './ui-cards.component';


@NgModule({
  declarations: [
    UiCardsComponent
  ],
  imports: [
    CommonModule,
    UiCardsRoutingModule
  ]
})
export class UiCardsModule { }
