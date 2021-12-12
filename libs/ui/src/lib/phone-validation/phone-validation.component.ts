import {Component, forwardRef, Inject, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {CountryISO, PhoneNumberFormat, SearchCountryField} from "ngx-intl-tel-input";
import {ChangeData} from "ngx-intl-tel-input/lib/interfaces/change-data";
import {ENV_CONFIG, EnvironmentConfig} from "@valor-launchpad/http";
import {HttpClient} from "@angular/common/http";
import {Notyf, NOTYFToken} from "../../index";

@Component({
  selector: 'valor-launchpad-phone-validation',
  templateUrl: './phone-validation.component.html',
  styleUrls: ['./phone-validation.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneValidationComponent),
      multi: true
    }
  ]
})
export class PhoneValidationComponent implements OnInit, ControlValueAccessor, OnDestroy {
  private apiBase = this.config.environment.apiBase;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.China];
  phone = new FormControl(undefined, [Validators.required])

  count = 0;
  interval$ = null;

  public disabled: boolean;
  public _value: number;

  onChanged: any = () => {};
  onTouched: any = () => {}

  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private http: HttpClient,
    @Inject(NOTYFToken) private notyf: Notyf,
  ) {
  }

  ngOnInit(): void {
    this.phone.valueChanges.subscribe((val: ChangeData) => {
      if (val !== null) {
        this.onChanged(val.e164Number);
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval$);
    this.interval$ = null;
  }

  writeValue(val) {
    this._value = val;
  }

  registerOnChange(fn: any) {
    this.onChanged = fn
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn
  }


  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  getCaptcha() {
    if (this.phone.valid && this.interval$ === null) {
      this.http.post(
        `${this.apiBase}api/auth/v1/send-captcha`,{
          phone: `${this.phone.value.e164Number}`
        }
      ).subscribe(() => {
        this.notyf.success(
          'The verification code has been sent, please check your message.'
        );
        this.count = 60;
        this.interval$ = setInterval(() => {
          this.count -= 1;
          if (this.count <= 0) {
            clearInterval(this.interval$);
            this.interval$ = null;
          }
        }, 1000);
      }, () => {
        this.notyf.success(
          'Something wrong with message service, please send again.'
        );
      });
    }

  }


}
