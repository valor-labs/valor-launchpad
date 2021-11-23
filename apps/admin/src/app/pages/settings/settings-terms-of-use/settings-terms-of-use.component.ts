import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  SettingsTermsOfUseService,
  TermsOfUseType,
} from './settings-terms-of-use.service';
import { TermsOfUseEntity } from '@valor-launchpad/common-api';
import { takeUntil, tap, filter, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'valor-launchpad-settings-terms-of-use',
  templateUrl: './settings-terms-of-use.component.html',
  styleUrls: ['./settings-terms-of-use.component.scss'],
})
export class SettingsTermsOfUseComponent implements OnInit, OnDestroy {
  constructor(
    private settingsTermsOfUseService: SettingsTermsOfUseService,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) {}

  public termsOfUseList: TermsOfUseEntity[] = [];
  private destroy$ = new Subject();
  public termsOfUseFormGroup: FormGroup = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });
  public currentModel = TermsOfUseType.Add;

  @ViewChild('termsOfUseModal') termsOfUseModal: ModalDirective;

  get modelHeader() {
    switch (this.currentModel) {
      case TermsOfUseType.Add:
        return 'Add Terms Of Use';
      default:
        return 'Edit Terms Of Use';
    }
  }

  ngOnInit(): void {
    this.fetchTermsOfUseList().subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addTermsOfUse() {
    this.currentModel = TermsOfUseType.Add;
    this.termsOfUseFormGroup.enable();
    this.termsOfUseFormGroup.reset();
    this.termsOfUseModal.show();
  }

  viewTermsOfUse(termsOfUse: TermsOfUseEntity) {
    const { title, content } = termsOfUse;

    this.currentModel = TermsOfUseType.View;
    this.termsOfUseFormGroup.patchValue({
      title,
      content,
    });
    this.termsOfUseFormGroup.disable();
    this.termsOfUseModal.show();
  }

  cancel() {
    this.termsOfUseFormGroup.reset();
    this.termsOfUseModal.hide();
  }

  fetchTermsOfUseList() {
    return this.settingsTermsOfUseService.fetchTermsOfUseList().pipe(
      tap((termsOfUseList: TermsOfUseEntity[]) => {
        this.termsOfUseList = termsOfUseList;
      }),
      takeUntil(this.destroy$)
    );
  }

  submitTermsOfUseModel() {
    this.settingsTermsOfUseService
      .addTermsOfUse(this.termsOfUseFormGroup.value)
      .pipe(
        tap(({ success, message }) => {
          if (success) {
            this.toastrService.success(message);
          } else {
            this.toastrService.error(message);
          }
        }),
        filter(({ success }) => success),
        switchMap(() => {
          return this.fetchTermsOfUseList();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.cancel();
      });
  }
}
