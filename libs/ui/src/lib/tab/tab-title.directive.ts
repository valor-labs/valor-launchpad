import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[valorLaunchpadTabTitle]'
})
export class TabTitleDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}
