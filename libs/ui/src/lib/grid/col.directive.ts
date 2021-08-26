import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[valorLaunchpadCol]'
})
export class ColDirective implements OnChanges {
  // col-1...
  @Input() span: string | number = null;

  // col-xs-1...
  @Input() xs: string | number = null;

  // col-sm-1...
  @Input() sm: string | number = null;

  // col-md-1...
  @Input() md: string | number = null;

  // col-lg-1...
  @Input() lg: string | number = null;

  // col-xl-1...
  @Input() xl: string | number = null;

  // col-xxl-1...
  @Input() xxl: string | number = null;

  @Input() expand = false;

  private builtClasses = new Set<string>();

  constructor(private renderer: Renderer2, private el: ElementRef<HTMLElement>) { }

  ngOnChanges(changes: SimpleChanges) {
    this.buildColClass();
  }

  private buildColClass(): void {
    const sizes = ['span', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
    const newClasses = new Set<string>();
    if (this.expand) {
      newClasses.add('col');
    }
    sizes.forEach(size => {
      if (this[size] !== null && this[size] !== undefined && (['number', 'string'].includes(typeof this[size]))) {
        if (size === 'span') {
          newClasses.add(`col-${this[size]}`)
        } else {
          newClasses.add(`col-${size}-${this[size]}`)
        }
      }
    })

    this.builtClasses.forEach(cls => this.renderer.removeClass(this.el.nativeElement, cls));
    this.builtClasses = newClasses;
    this.builtClasses.forEach(cls => this.renderer.addClass(this.el.nativeElement, cls));
  }

}
