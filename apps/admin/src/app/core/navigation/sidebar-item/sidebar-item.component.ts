import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { NavigationService } from '../navigation.service';
import { delay, filter, map, take } from 'rxjs/operators';
import { ValorThemeService } from '../../theme/valor-theme.service';
import { Menu } from '@valor-launchpad/api-interfaces';
import { Subscription } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'li[valor-launchpad-sidebar-item]',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
})
export class SidebarItemComponent implements OnInit, OnDestroy {
  isGroup = false;
  isActive = false;
  isNotCompact$ = this.themeService.sidebarBehavior$.pipe(
    map((behavior) => behavior !== 'compact')
  );

  @Input() menu: Menu;
  @Input() parent: SidebarItemComponent;

  @HostBinding('class.sidebar-item') private basicCls = true;
  @HostBinding('class.collapsed') collapsed = true;
  @HostBinding('attr.data-bs-toggle') get bsToggleData() {
    return this.isGroup ? 'collapse' : null;
  }

  @Output() opened = new EventEmitter();
  @ViewChild('routerLinkActive') linker: RouterLinkActive;
  @ViewChildren(SidebarItemComponent)
  sidebarItemComponents: QueryList<SidebarItemComponent>;

  private subs = new Subscription();

  activeInDescendants() {
    const children = this.sidebarItemComponents?.toArray();
    if (Array.isArray(children) && children.length > 0) {
      return children.some((i) => i.activeInDescendants());
    } else {
      return !!this.linker?.isActive;
    }
  }

  constructor(
    private navigationService: NavigationService,
    public themeService: ValorThemeService,
    private router: Router,
    public zone: NgZone
  ) {}

  ngOnInit(): void {
    const { route, children } = this.menu;
    this.isGroup = Array.isArray(children) && route === null;
    this.navigationService.lastUrl$
      .pipe(
        take(1),
        delay(0),
        filter((url) => url.includes(this.menu.route))
      )
      .subscribe(() => this.openParent());
    this.subs.add(
      this.navigationService.lastUrl$.pipe(delay(0)).subscribe(() => {
        this.isActive = this.activeInDescendants();
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onToggle() {
    if (this.isGroup) {
      this.collapsed = !this.collapsed;
      if (!this.collapsed) {
        this.opened.emit();
      }
    }
  }

  openParent() {
    this.collapsed = false;
    if (this.parent) {
      this.parent.openParent();
    }
  }

  onNavigateToItem(route) {
    this.zone.run(() => {
      this.router.navigate([route]);
    });
  }
}
