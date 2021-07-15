import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'valor-launchpad-editor-slate-button',
  templateUrl: './editor-slate-button.component.html',
  styleUrls: ['./editor-slate-button.component.scss']
})
export class EditorSlateButtonComponent {
  constructor(private el: ElementRef<HTMLElement>) {
    this.el.nativeElement.onmousedown = evt => evt.preventDefault();
  }
}
