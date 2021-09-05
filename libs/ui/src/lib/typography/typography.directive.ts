import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[valorLaunchpadTypography]'
})
export class TypographyDirective implements OnInit {

  @Input()
  set vlType(value: string) {
    this.type = value
  }

  private el: HTMLElement
  private type: string

  constructor(
    private elementRef: ElementRef,
    public renderer: Renderer2) { 
      this.el = this.elementRef.nativeElement
  }

  ngOnInit(): void {
    this.setType()
  }

  setType(): void {
    if(this.type) {
      this.renderer.setAttribute(this.el, 'class', ` text-${this.type} ${this.el.className}`.trim())
    }
  }

}
