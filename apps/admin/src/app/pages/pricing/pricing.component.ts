import {Component, Inject} from '@angular/core';
import { FAQ } from '@valor-launchpad/api-interfaces';
import {HttpClient} from '@angular/common/http';
import {ENV_CONFIG, EnvironmentConfig} from '../../core/http/environment-config.interface';
@Component({
  selector: 'valor-launchpad-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent  {
  monthlyActive = true;
  annualActive = false;

  faqs: FAQ[] =[];

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private http:HttpClient) {
    this.fetch();
  }

  fetch(){
    this.http.get<FAQ[]>(this.config.environment.apiBase +'api/faq').subscribe((t)=>this.faqs=t);
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
