import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'valor-launchpad-ui-modals',
  templateUrl: './ui-modals.component.html',
  styleUrls: ['./ui-modals.component.scss']
})
export class UiModalsComponent {

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  openColoredModal(template: TemplateRef<void>, cls: string) {
    this.modalRef = this.modalService.show(template, { class: `modal-colored ${cls}` });
  }

  openCenteredModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
  }

  openSizedModal(template: TemplateRef<void>, sizeCls: 'modal-sm' | 'modal-md' | 'modal-lg') {
    this.modalRef = this.modalService.show(template, { class: sizeCls });
  }

  closeModal() {
    this.modalRef.hide();
  }

}
