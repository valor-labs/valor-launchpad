import { AfterViewInit, Directive, ElementRef, TemplateRef, ViewChild } from '@angular/core';

@Directive({
  selector: '[valorLaunchpadHeadMenu]'
})
export class HeadMenuDirective implements AfterViewInit {

  @ViewChild('tpl', { static: false })
  tpl: TemplateRef<HTMLElement>

  constructor(private elementRef: ElementRef) { 
    
  }
  ngAfterViewInit(): void {
    console.log(this, 'tpl');
  }

}
