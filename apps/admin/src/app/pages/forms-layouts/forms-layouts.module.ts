import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsLayoutsComponent } from './forms-layouts.component';
import { FormsLayoutsRoutingModule } from './forms-layouts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@valor-launchpad/ui';

@NgModule({
  declarations: [FormsLayoutsComponent],
  imports: [
    CommonModule,
    FormsLayoutsRoutingModule,
    ReactiveFormsModule,
    UiModule,
  ],
})
export class FormsLayoutsModule {}
