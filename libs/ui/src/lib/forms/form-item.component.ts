import { Component, ContentChildren, HostBinding, Input, QueryList } from '@angular/core';
import { NgControl } from '@angular/forms';

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
  @ContentChildren(NgControl) controls: QueryList<NgControl>;

  @HostBinding('class.mb-3')
  private get isValid() {
    return !this.controls.toArray().find(i => i.dirty && i.invalid);
  }

  @HostBinding('class.form-floating')
  @Input()
  vlOutlined = false;
}
