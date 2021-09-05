import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../core/navigation/navigation.service';

@Component({
  selector: 'valor-launchpad-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.getMenus().subscribe()
  }

}
