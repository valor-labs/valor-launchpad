import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[valorLaunchpadAutocompleteContent]'
})
export class AutocompleteContentDirective {

  constructor(
    public tpl: TemplateRef<any>
  ) { }

}
