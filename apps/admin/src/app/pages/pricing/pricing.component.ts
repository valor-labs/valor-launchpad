import { Component, Inject, OnDestroy } from '@angular/core';
import { FAQ } from '@valor-launchpad/api-interfaces';
import { HttpClient } from '@angular/common/http';
import {
  ENV_CONFIG,
  EnvironmentConfig,
} from '../../core/http/environment-config.interface';
@Component({
  selector: 'valor-launchpad-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnDestroy {
  billyBtnActive = true;
  billActive = true;
  billShow = true;
  private raf: number | null = null;

  faqs: FAQ[] = [];

  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private http: HttpClient
  ) {
    this.fetch();
  }

  fetch() {
    this.http
      .get<FAQ[]>(this.config.environment.apiBase + 'api/faq')
      .subscribe((t) => (this.faqs = t));
  }

  handleMonthly() {
    this.billyBtnActive = true;
    this.billActive = true;
    this.raf = window.requestAnimationFrame(() => {
      this.billShow = true;
    });
  }

  handleAnnual() {
    this.billyBtnActive = false;
    this.billActive = false;
    this.raf = window.requestAnimationFrame(() => {
      this.billShow = false;
    });
  }

  ngOnDestroy(): void {
    this.raf = null;
  }
}
