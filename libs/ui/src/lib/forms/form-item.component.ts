import {
  Component,
  ContentChildren,
  HostBinding,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'valor-launchpad-form-item',
  template: `
    <ng-content></ng-content>
    <ng-container *ngIf="!isTemplate; else templateOutlet">
      <label
        *ngIf='dirtyAndInvalid'
        class="error jquery-validation-error small form-text invalid-feedback">
        {{ errTip }}
      </label>
    </ng-container>
    <ng-template #templateOutlet>
      <ng-container *ngTemplateOutlet="errTip"></ng-container>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class FormItemComponent {
  @ContentChildren(NgControl) controls: QueryList<NgControl>;

  @HostBinding('class.mb-3')
  private get withMargin() {
    return !this.dirtyAndInvalid || !this.errTip;
  }

  get dirtyAndInvalid(): boolean {
    return !!this.controls.toArray().find((i) => i.dirty && i.invalid);
  }

  @HostBinding('class.form-floating')
  @Input()
  vlOutlined = false;

  @Input() errTip: string | TemplateRef<void>;

  get isTemplate() {
    return this.errTip instanceof TemplateRef;
  }
}
