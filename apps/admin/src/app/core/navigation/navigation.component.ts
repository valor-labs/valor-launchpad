import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NavigationService } from './navigation.service';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';

@Component({
  selector: 'valor-launchpad-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  subMenuCollapseState = {
    projects: true,
  };
  collapsed = false;

  @ViewChildren(SidebarItemComponent)
  private sidebarItems: QueryList<SidebarItemComponent>;

  @Input() menus = [];

  constructor(public navigationService: NavigationService) {
    //  TODO: Make the menu state reflect the navigation tree
    this.navigationService.collapseState$.subscribe((newCollapseState) => {
      this.collapsed = newCollapseState;
    });
  }

  ngOnInit() {}

  onOpen(self: SidebarItemComponent) {
    // close siblings when open one
    this.sidebarItems.forEach((i) => {
      if (i !== self) {
        i.collapsed = true;
      }
    });
  }
}
