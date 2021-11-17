import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {
  Action,
  MegaMenuColumn,
  Menu,
  ProjectListItemVo,
} from '@valor-launchpad/api-interfaces';
import { Message } from '@valor-launchpad/api-interfaces';
import { NavigationService } from '../navigation/navigation.service';
import { UserEntity } from '@valor-launchpad/common-api';
import { HeaderService } from './header.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ProjectsListService } from '../../pages/projects-list/projects-list.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ProfileService } from '../../pages/profile/profile.service';
import { ProfileEntity } from '@valor-launchpad/common-api';

@Component({
  selector: 'valor-launchpad-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //TODO this and the items in navigation.component need to come from a service
  @ViewChild('defaultWarningModal', { static: false })
  defaultWarningModal?: ModalDirective;
  user$: Observable<UserEntity> = this.authService.user;
  profile: ProfileEntity;
  messages: Message[] = [];
  megaMenus$: Observable<MegaMenuColumn[]> =
    this.navigationService.megaMenus$.pipe(
      map<Menu[], MegaMenuColumn[]>((menus) =>
        menus.map((parent) => ({
          label: parent.name,
          actions: parent.children.map((sub) => ({
            label: sub.name,
            routerLink: sub.route,
          })),
        }))
      )
    );

  public content: string;

  profileActions: Action[] = [
    {
      label: 'Profile',
      icon: 'user',
      routerLink: '/profile',
    },
    {
      label: 'Analytics',
      icon: 'chart-pie',
      link: '/dashboard-analytics',
      divider: true,
    },
    {
      label: 'Settings & Privacy',
      routerLink: '/settings',
    },
    {
      label: 'Help',
      link: 'pages-settings.html',
    },
    {
      label: 'Sign out',
      event: this.signOut.bind(this),
    },
  ];

  constructor(
    private authService: AuthService,
    private headerService: HeaderService,
    private navigationService: NavigationService,
    private projectsListService: ProjectsListService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe((profile) => {
      this.profile = profile;
    });

    this._initProjectSearch();
    this.content = 'Your account will logged out.';
  }

  toggleMenu() {
    this.navigationService.toggleCollapse();
  }

  signOut() {
    this.showModal();
  }

  showModal() {
    this.defaultWarningModal?.show();
  }

  confirmSignOut() {
    this.content = '....Logging out';
    this.authService.signOut().subscribe(() => {
      // todo: add logic here
    });
  }

  setLanguage(language: string) {
    //TODO Handle langauge switch
    console.log('switching to ' + language);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  projectSearchFc: FormControl;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  projectOptions: ProjectListItemVo[];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  filteredProjectOptions: ProjectListItemVo[];

  private _initProjectSearch(): void {
    this.projectSearchFc = new FormControl();
    this.projectsListService.getProjects().subscribe((res) => {
      this.projectOptions = res;
      this.projectSearchFc.valueChanges
        .pipe(
          startWith(''),
          map((value) => this._filterProjects(value))
        )
        .subscribe();
    });
  }

  private _filterProjects(searchKey): void {
    if (searchKey === '') {
      this.filteredProjectOptions = this.projectOptions;
    } else {
      this.filteredProjectOptions = this.projectOptions.filter(
        (item) =>
          item.title.toLowerCase().includes(searchKey.toLowerCase()) === true
      );
    }
  }
}
