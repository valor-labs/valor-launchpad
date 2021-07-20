import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';

@Component({
  selector: 'valor-launchpad-chip',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {
  @Output() chipClose:EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Input()
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' |
    'primary-outline' | 'secondary-outline' | 'success-outline' | 'danger-outline' | 'warning-outline'
    | 'info-outline' | 'light-outline' | 'dark-outline'

  //Todo: add the avatar chip from https://mdbootstrap.com/docs/standard/components/chips/

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef) {
  }

  close(e: MouseEvent) {
    this.chipClose.emit(e);
    if (!e.defaultPrevented) {
      this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement),
        this.elementRef.nativeElement);
    }
  }

  ngOnInit(): void {
  }

}
