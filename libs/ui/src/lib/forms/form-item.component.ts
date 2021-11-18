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
    <span *ngIf='!!helpTip' class="font-13 text-muted">{{helpTip}}</span>
    <ng-container *ngIf="!isTemplate; else templateOutlet">
      <label
        *ngIf='dirtyAndInvalid'
        class="error small form-text invalid-feedback">
        {{ errTip }}
      </label>
    </ng-container>
    <ng-container *ngIf="!isSuccessTemplate; else succcessTemplateOutlet">
      <label
        *ngIf='valid && successTip'
        class="small form-text">
        {{ successTip }}
      </label>
    </ng-container>
    <ng-template #templateOutlet>
      <div *ngIf='dirtyAndInvalid' class="error small form-text invalid-feedback">
        <ng-container *ngTemplateOutlet="errTip; context: {$implicit: controls.get(0)}"></ng-container>
      </div>
    </ng-template>
    <ng-template #succcessTemplateOutlet>
      <div *ngIf='valid' class="small form-text">
        <ng-container *ngTemplateOutlet="successTip; context: {$implicit: controls.get(0)}"></ng-container>
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

  get valid(): boolean {
    return !!this.controls.toArray().find((i) => (i.dirty || i.touched) && i.valid);
  }

  @HostBinding('class.form-floating')
  @Input()
  vlOutlined = false;

  @Input() errTip: string | TemplateRef<unknown>;
  @Input() successTip: string | TemplateRef<unknown>;
  @Input() helpTip: string;

  get isTemplate() {
    return this.errTip instanceof TemplateRef;
  }

  get isSuccessTemplate() {
    return this.successTip instanceof TemplateRef;
  }
}
