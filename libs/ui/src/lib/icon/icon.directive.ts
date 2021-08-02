import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

type ThemeType = 'solid' | 'regular' | 'brand'
enum Theme {
  'solid' = 'fas',
  'regular' = 'far',
  'brand' = 'fab'
}

@Directive({
  selector: '[valorLaunchpadIcon]'
})
export class IconDirective implements OnInit {

  @Input()
  set vlTheme(value: ThemeType) {
    this.theme = value
  }

  @Input() 
  set vlType(value: string) {
    this.type = value
  }

  private el: HTMLElement
  private theme: ThemeType
  private type: string

  constructor(
    private elementRef: ElementRef,
    public renderer: Renderer2
  ) { 
    this.el = this.elementRef.nativeElement
  }

  ngOnInit(): void {
    this.setTheme()
  }

  private setTheme(): void {
    const cacheClassName = `align-middle me-2 ${Theme[this.theme]} fa-fw`
    this.renderer.setAttribute(this.el, 'class', `${cacheClassName} fa-${this.type} ${this.el.className}`.trim())
  }

}
