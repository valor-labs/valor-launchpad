import {
  Component,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  TemplateRef
} from '@angular/core';
import { ModalButtonOption, ModalSize, ModalTheme } from './modal.model';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'valor-launchpad-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  exportAs: 'valorModal'
})
export class ModalComponent implements OnInit {
  @HostBinding('class.modal')
  @HostBinding('class.fade')
  private base = true;
  @HostBinding('tabindex')
  private val = '-1'

  @Input() heading: string | TemplateRef<void>;
  @Input() content: string | TemplateRef<void>;
  @Input() footer: ModalButtonOption[] | TemplateRef<void>;
  @Input() closableByIcon = true;
  @Input() centered = false;
  @Input() size: ModalSize = 'md';

  @HostBinding('class.modal-colored') @Input() theme: ModalTheme;

  get isFooterTemplate() {
    return this.footer instanceof TemplateRef;
  }

  isTemplate(val: unknown) {
    return val instanceof TemplateRef;
  }

  constructor(
    @Host() private modalDirective: ModalDirective,
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.buildContainerClass();
  }

  closeSelf() {
    this.modalDirective.hide();
  }

  private buildContainerClass(): void {
    const containerEl = this.el.nativeElement;
    if (this.theme) {
      this.removeAllThemeCls(containerEl);
      this.renderer.addClass(containerEl, `modal-${this.theme}`);
    } else {
      this.removeAllThemeCls(containerEl);
    }
  }

  private removeAllThemeCls(el: HTMLElement) {
    const themeClasses: ModalTheme[] = ['success', 'warning', 'danger', 'primary'];
    themeClasses.forEach(t => this.renderer.removeClass(el, `modal-${t}`));
  }
}
