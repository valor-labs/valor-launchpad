import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: 'valor-launchpad-card-subtitle, [valor-launchpad-card-subtitle]'
})
export class CardSubTitleDirective {
  @HostBinding('class.card-subtitle') private title = true;
  constructor() { }

}
