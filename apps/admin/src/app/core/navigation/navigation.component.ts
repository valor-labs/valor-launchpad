import {
  AfterViewInit,
  Component,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import SimpleBar from 'simplebar';
import { NavigationService } from './navigation.service';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';

@Component({
  selector: 'valor-launchpad-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements AfterViewInit {
  @ViewChildren(SidebarItemComponent)
  private sidebarItems: QueryList<SidebarItemComponent>;

  @Input() menus = [];
  subMenuCollapseState = {
    projects: true,
  };
  collapsed = false;

  ngAfterViewInit() {
    new SimpleBar(
      <HTMLElement>document.getElementsByClassName('js-simplebar')[0]
    );
  }

  constructor(public navigationService: NavigationService) {
    //  TODO: Make the menu state reflect the navigation tree
    this.navigationService.collapseState$.subscribe((newCollapseState) => {
      this.collapsed = newCollapseState;
    });
  }

  onOpen(self: SidebarItemComponent) {
    // close siblings when open one
    this.sidebarItems.forEach((i) => {
      if (i !== self) {
        i.collapsed = true;
      }
    });
  }
}
