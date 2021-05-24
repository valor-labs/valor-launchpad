import { Component } from '@angular/core';
import { FAQ } from '@valor-launchpad/api-interfaces';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'valor-launchpad-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent  {
  monthlyActive = true;
  annualActive = false;

  faqs: FAQ[] =[];

  constructor(private http:HttpClient) {
    this.fetch();
  }

  fetch(){
    this.http.get<FAQ[]>('/api/faq').subscribe((t)=>this.faqs=t);
  }

  handleMonthly() {
    this.monthlyActive = true;
    this.annualActive = false;
  }

  handleAnnual() {
    this.monthlyActive = false;
    this.annualActive = true;
  }
}
