import { ChangeDetectorRef, Component, ElementRef, HostBinding, Renderer2 } from '@angular/core';
import { BaseTextComponent } from 'slate-angular';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'span[markText]',
  template: `<slate-leaves [context]='context' [viewContext]='viewContext'></slate-leaves>`,
})
export class EditorSlateTextComponent extends BaseTextComponent {
  @HostBinding('attr.data-slate-node') private dsn = 'text';

  constructor(public elementRef: ElementRef, public renderer: Renderer2, cdr: ChangeDetectorRef) {
    super(elementRef, cdr);
  }

  applyTextMark() {
    const hostEl = this.elementRef.nativeElement;
    if (this.text['bold']) {
      this.renderer.setStyle(hostEl, 'font-weight', 'bold');
    } else {
      this.renderer.removeStyle(hostEl, 'font-weight');
    }
    if (this.text['italic']) {
      this.renderer.setStyle(hostEl, 'font-style', 'italic');
    } else {
      this.renderer.removeStyle(hostEl, 'font-style');
    }
    if (this.text['code']) {
      this.renderer.addClass(hostEl, 'code');
    } else {
      this.renderer.removeClass(hostEl, 'code');
    }
    if (this.text['underlined']) {
      this.renderer.setStyle(hostEl, 'text-decoration', 'underline');
    } else {
      this.renderer.removeStyle(hostEl, 'text-decoration');
    }
  }

  onContextChange() {
    super.onContextChange();
    this.applyTextMark();
  }
}
