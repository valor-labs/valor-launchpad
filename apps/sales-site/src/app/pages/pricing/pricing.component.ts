import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { ThemeService, themeType } from '../../core/theme/theme.service'

@Component({
  selector: 'valor-launchpad-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit, OnDestroy {

  theme: themeType
  private theme$: Subscription
  constructor( private themeService: ThemeService ) { }

  ngOnInit(): void {
    this.theme$ = this.themeService.getTheme().subscribe(theme => {
      this.theme = theme
    })
  }

  ngOnDestroy(): void {
    this.theme$.unsubscribe()
  }

}
