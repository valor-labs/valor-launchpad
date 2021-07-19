import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: 'valor-launchpad-card-title, [valor-launchpad-card-title]'
})
export class CardTitleDirective {
  @HostBinding('class.card-title') private title = true;
  constructor() { }


}
