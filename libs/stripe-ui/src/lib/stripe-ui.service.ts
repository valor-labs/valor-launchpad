import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllCountriesResponse } from '@valor-launchpad/stripe-api';
import { FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class StripeUiService {
  constructor(private http: HttpClient) {
  }
  getAllCountries() {
    return this.http.get<AllCountriesResponse>('/api/stripe/v1/countries');
  }

  loopFormGroup(group: FormGroup) {
    for (const key of Object.keys(group.controls)) {
      group.controls[key].markAsDirty();
      group.controls[key].updateValueAndValidity({ emitEvent: false });
    }
  }
}
