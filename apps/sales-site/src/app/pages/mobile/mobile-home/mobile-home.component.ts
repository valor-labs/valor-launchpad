import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService, themeType } from '../../../core/theme/theme.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'valor-launchpad-mobile-home',
  templateUrl: './mobile-home.component.html',
  styleUrls: ['./mobile-home.component.scss']
})
export class MobileHomeComponent implements OnInit, OnDestroy {
  theme: themeType;
  destroy$ = new Subject()

  constructor(private themeService: ThemeService) { }

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
