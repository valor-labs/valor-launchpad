import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[valorLaunchpadTabContent]'
})
export class TabContentDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}
