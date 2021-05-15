import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'valor-launchpad-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  // TODO: this needs to be reworked for submenus
  menuCollapseState = {
    dashboards: false,
    pages: true,
    auth: true,
    ui: true
  };

  subMenuCollapseState = {
    projects: true
  };

  constructor() {
    //  TODO: Make the menu state reflect the navigation tree
  }

  ngOnInit(): void {
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
