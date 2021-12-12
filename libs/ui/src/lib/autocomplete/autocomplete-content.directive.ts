import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[valorLaunchpadAutocompleteContent]'
})
export class AutocompleteContentDirective {
  tpl: TemplateRef<any>
  // constructor(
  //   // public tpl: TemplateRef<any>
  // ) { }
}
