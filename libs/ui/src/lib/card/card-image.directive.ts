import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: `valor-launchpad-card-image, [valor-launchpad-card-image]`
})
export class CardImageDirective {
  @HostBinding('class.card-img-top') private image = true;
  constructor() { }

}
