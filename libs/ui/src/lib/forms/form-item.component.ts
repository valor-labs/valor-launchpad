import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'valor-launchpad-form-item',
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class FormItemComponent {
  @HostBinding('class.mb-3')
  basicClass = true;

  @HostBinding('class.form-floating')
  @Input()
  vlOutlined = false;
}
