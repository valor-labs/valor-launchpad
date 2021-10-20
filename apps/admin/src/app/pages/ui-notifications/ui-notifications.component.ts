import { Component, Inject, OnInit } from '@angular/core';
import { NOTYFToken, Notyf } from '@valor-launchpad/ui';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'valor-launchpad-ui-notifications',
  templateUrl: './ui-notifications.component.html',
  styleUrls: ['./ui-notifications.component.scss'],
})
export class UiNotificationsComponent implements OnInit {
  notifSettingForm: FormGroup;

  constructor(
    @Inject(NOTYFToken) private notyf: Notyf,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.notifSettingForm = this.fb.group({
      message: new FormControl(''),
      type: new FormControl('success'),
      duration: new FormControl(5000),
      withRipple: new FormControl(true),
      dismissible: new FormControl(false),
      horizontalPosition: new FormControl('right'),
      verticalPosition: new FormControl('top'),
    });
  }

  alert() {
    const form = this.notifSettingForm.value;
    this.notyf.open({
      message: form.message,
      type: form.type,
      duration: form.duration,
      ripple: form.withRipple,
      dismissible: form.dismissible,
      position: { x: form.horizontalPosition, y: form.verticalPosition },
    });
  }
}
