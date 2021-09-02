import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'valor-launchpad-form-label',
  template: `
    <ng-content></ng-content>&nbsp;
    <span *ngIf='required' class='text-danger'>*</span>
  `,
  styles: []
})
export class FormLabelComponent implements OnInit {
  @HostBinding('class.form-label') private h = true;
  @Input() required = false;
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.el.nativeElement.style.display = 'inline-block';
  }

}
