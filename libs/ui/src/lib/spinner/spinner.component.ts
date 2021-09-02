import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Component({
  selector: 'valor-launchpad-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent implements OnChanges {
  @Input() size: 'sm' | 'md' = 'md';

  @Input() type: 'border' | 'grow' = 'border';

  @Input() theme: 'dark' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' = 'primary';

  private builtClasses = new Set<string>();

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) { }

  ngOnChanges() {
    const newClasses = new Set<string>();
    newClasses.add(`spinner-${this.type}`);
    if (this.size === 'sm') {
      newClasses.add(`spinner-${this.type}-${this.size}`)
    }
    newClasses.add(`text-${this.theme}`);
    this.builtClasses.forEach(cls => this.renderer.removeClass(this.el.nativeElement, cls));
    this.builtClasses = newClasses;
    this.builtClasses.forEach(cls => this.renderer.addClass(this.el.nativeElement, cls));
  }
}
