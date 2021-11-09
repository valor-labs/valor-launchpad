import {
  Component,
  EventEmitter, HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'valor-launchpad-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss'],
})
export class OffcanvasComponent implements OnInit, OnChanges {
  @Input()
  show: boolean = false;

  @Input()
  title: string = 'Offcanvas';

  @Input()
  position: 'start' | 'end' | 'bottom' = 'start';

  @Input()
  scrolling: boolean = false;

  @Input()
  backdrop: boolean = true;

  @Input()
  headerClass: string = '';

  @Input()
  bodyClass: string = '';

  @Output()
  onClose = new EventEmitter();

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.handleClose();
  }

  handleClose() {
    this.onClose.emit();
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.show.currentValue) {
      if (this.scrolling) {
        this.renderer.removeClass(document.body, 'no-scroll');
      } else {
        this.renderer.addClass(document.body, 'no-scroll');
      }
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }
}
