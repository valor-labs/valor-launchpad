import {Component} from '@angular/core';
import {NavigationService} from './navigation.service';

@Component({
  selector: 'valor-launchpad-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  // TODO: this needs to be reworked for submenus
  menuCollapseState = {
    dashboards: false,
    pages: true,
    documentation:true,
    auth: true,
    ui: true,
    forms: true,
    formPlugins: true,
    datatables: true,
    charts: true,
    maps: true
  };

  subMenuCollapseState = {
    projects: true
  };
  collapsed = false;

  constructor(private navigationService: NavigationService) {
    //  TODO: Make the menu state reflect the navigation tree
    this.navigationService.collapseState$.subscribe(newCollapseState => {
      this.collapsed = newCollapseState;
    })
  }

  toggleCollapse(target: string) {
    // TODO: this needs to be reworked for submenus

    if (!this.menuCollapseState[target]) {
      this.menuCollapseState[target] = true;
    } else {
      Object.keys(this.menuCollapseState).forEach(key => {
        this.menuCollapseState[key] = true;
      });
      this.menuCollapseState[target] = false;
    }
  }

  toggleSubmenuCollapse(target: string): void {
    this.subMenuCollapseState[target] = !this.subMenuCollapseState[target];
  }

}
