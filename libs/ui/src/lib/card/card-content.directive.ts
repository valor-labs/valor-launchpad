import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: 'valor-launchpad-card-content, [valor-launchpad-card-content]'
})
export class CardContentDirective {
  @HostBinding('class.card-body') private content = true;
  constructor() { }

}
