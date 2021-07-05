import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[valorLaunchpadRow]'
})
export class RowDirective {
  @HostBinding('class.row') h = true;
  constructor() { }

}
