import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteOptionComponent } from './autocomplete-option/autocomplete-option.component';
import { AutocompleteContentDirective } from './autocomplete-content.directive';
import { AutocompleteTriggerDirective } from './autocomplete-trigger.directive';
import { OverlayModule } from '@angular/cdk/overlay';

const publicApi = [
  AutocompleteComponent,
  AutocompleteOptionComponent,
  AutocompleteContentDirective,
  AutocompleteTriggerDirective
];

@NgModule({
  declarations: [
    publicApi
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [
    publicApi
  ]
})
export class AutocompleteModule { }
