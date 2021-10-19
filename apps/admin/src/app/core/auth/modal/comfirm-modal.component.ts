import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthService } from '../auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'valor-launchpad-comfirm-modal',
  templateUrl: './comfirm-modal.component.html',
  styleUrls: ['./comfirm-modal.component.scss']
})
export class ComfirmModalComponent implements OnInit {
  constructor(public bsModalRef: BsModalRef, private authService: AuthService) { }

  closeBtnName?: string;
  title: string;
  content: string;
  url: string;
  ngOnInit(): void {
  }

  handleClose() {
    localStorage.setItem('preUrl', this.url);
    this.bsModalRef.hide();
    this.authService.signOut().subscribe(() => {});
  }

}
