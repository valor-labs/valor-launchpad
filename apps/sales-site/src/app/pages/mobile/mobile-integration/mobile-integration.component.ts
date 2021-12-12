import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService, themeType } from '../../../core/theme/theme.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'valor-launchpad-mobile-integration',
  templateUrl: './mobile-integration.component.html',
  styleUrls: ['./mobile-integration.component.scss']
})
export class MobileIntegrationComponent implements OnInit, OnDestroy {
  theme: themeType;
  destroy$ = new Subject();

  get integrationBtnText() {
    if (this.router.url.includes('stripe')) {
      return 'View all integrations'
    } else {
      return 'Get started now';
    }
  }

  constructor(private themeService: ThemeService, private router: Router) { }

  ngOnInit(): void {
    this.themeService.getTheme().pipe(
      takeUntil(this.destroy$)
    )
      .subscribe(theme => {
        this.theme = theme
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
