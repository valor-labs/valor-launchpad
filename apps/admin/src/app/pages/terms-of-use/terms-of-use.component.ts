import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TermsOfUseService } from './terms-of-use.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TermsOfUseEntity } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent implements OnInit, OnDestroy {
  public acceptControl = new FormControl(false);
  public acceptOption = [
    {
      label: 'I have read and accepted this Term of Use',
      value: true,
    },
  ];
  private destroy$ = new Subject();
  public termsOfUse: TermsOfUseEntity;

  get buttonDisabled() {
    return !this.acceptControl.value?.length;
  }
  constructor(
    private termsOfUseService: TermsOfUseService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getLatestTermsOfUse();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getLatestTermsOfUse() {
    this.termsOfUseService
      .getLatestTermsOfUse()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ success, data, message }) => {
        if (success) {
          this.termsOfUse = data;
        } else {
          this.toastrService.error(message);
          this.router.navigate(['/sign-in']);
        }
      });
  }

  handleAccept() {
    this.termsOfUseService
      .acceptTermsOfUse()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ success, message }) => {
        if (success) {
          this.router.navigate(['/dashboard-default']);
        } else {
          this.toastrService.error(message);
          this.router.navigate(['/sign-in']);
        }
      });
  }
}
