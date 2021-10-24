import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'valor-launchpad-comfirm-modal',
  templateUrl: './comfirm-modal.component.html',
  styleUrls: ['./comfirm-modal.component.scss'],
})
export class ComfirmModalComponent {
  //TODO: There is an error here saying its not included in a module
  constructor(
    public bsModalRef: BsModalRef,
    private authService: AuthService
  ) {}

  closeBtnName?: string;
  title: string;
  content: string;
  url: string;

  handleClose() {
    localStorage.setItem('preUrl', this.url);
    this.bsModalRef.hide();
    this.authService.signOut().subscribe();
  }
}
