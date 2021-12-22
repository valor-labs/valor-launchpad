import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {CountryISO, PhoneNumberFormat, SearchCountryField} from "ngx-intl-tel-input";
import {ENV_CONFIG, EnvironmentConfig} from "@valor-launchpad/http";
import {HttpClient} from "@angular/common/http";
import {Notyf, NOTYFToken} from "../../index";

@Component({
  selector: 'valor-launchpad-phone-validation',
  templateUrl: './phone-validation.component.html',
  styleUrls: ['./phone-validation.component.scss']
})
export class PhoneValidationComponent implements OnInit, OnDestroy {
  @Input() phoneFc: AbstractControl;
  private apiBase = this.config.environment.apiBase;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.China];
  count = 0;
  interval$ = null;

  public disabled: boolean;
  public _value: number;

  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private http: HttpClient,
    @Inject(NOTYFToken) private notyf: Notyf,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    clearInterval(this.interval$);
    this.interval$ = null;
  }

  writeValue(val) {
    this._value = val;
  }



  getCaptcha() {
    if (this.phoneFc.valid && this.interval$ === null) {
      this.http.post(
        `${this.apiBase}api/auth/v1/send-captcha`, {
          phone: `${this.phoneFc.value.e164Number}`
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
