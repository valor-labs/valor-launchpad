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
      <div *ngIf='dirtyAndInvalid' class="error jquery-validation-error small form-text invalid-feedback">
        <ng-container *ngTemplateOutlet="errTip; context: {$implicit: controls.get(0)}"></ng-container>
      </div>
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
    return !!this.controls.toArray().find((i) => (i.dirty || i.touched) && i.invalid);
  }

  @HostBinding('class.form-floating')
  @Input()
  vlOutlined = false;

  @Input() errTip: string | TemplateRef<unknown>;

  get isTemplate() {
    return this.errTip instanceof TemplateRef;
  }
}
