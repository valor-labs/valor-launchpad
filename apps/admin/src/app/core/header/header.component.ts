import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Action, MegaMenuColumn, Menu } from '@valor-launchpad/api-interfaces';
import { Message, Notification } from '@valor-launchpad/api-interfaces';
import { NavigationService } from '../navigation/navigation.service';
import { UserEntity } from '@valor-launchpad/common-api';
import { HeaderService } from './header.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ProjectsListService } from '../../pages/projects-list/projects-list.service';
import { Project } from '@api/projects';

@Component({
  selector: 'valor-launchpad-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //TODO this and the items in navigation.component need to come from a service
  user: UserEntity;
  messages: Message[] = [];
  notifications: Notification[] = [];
  megaMenus$: Observable<MegaMenuColumn[]> =
    this.navigationService.megaMenus$.pipe(
      map<Menu[], MegaMenuColumn[]>((menus) =>
        menus.map((parent) => ({
          label: parent.name,
          actions: parent.children.map((sub) => ({
            label: sub.name,
            routerLink: sub.route
          }))
        }))
      )
    );
  languageActions: Action[] = [
    {
      image: {
        src: 'assets/img/flags/us.png',
        alt: 'American Flag'
      },
      label: 'English',
      event: this.setLanguage.bind(this, 'english')
    },
    {
      image: {
        src: 'assets/img/flags/es.png',
        alt: 'Spanish Flag'
      },
      label: 'Spanish',
      event: this.setLanguage.bind(this, 'spanish')
    },
    {
      image: {
        src: 'assets/img/flags/de.png',
        alt: 'German Flag'
      },
      label: 'German',
      event: this.setLanguage.bind(this, 'german')
    },
    {
      image: {
        src: 'assets/img/flags/nl.png',
        alt: 'Dutch Flag'
      },
      label: 'Dutch',
      event: this.setLanguage.bind(this, 'Dutch')
    }
  ];
  currentLanguage: Action = this.languageActions[0];
  profileActions: Action[] = [
    {
      label: 'Profile',
      icon: 'user',
      routerLink: '/profile'
    },
    {
      label: 'Analytics',
      icon: 'area-chart',
      link: '#',
      divider: true
    },
    {
      label: 'Settings & Privacy',
      routerLink: '/settings'
    },
    {
      label: 'Help',
      link: 'pages-settings.html'
    },
    {
      label: 'Sign out',
      event: this.signOut.bind(this)
    }
  ];

  constructor(private authService: AuthService,
              private headerService: HeaderService,
              private navigationService: NavigationService,
              private projectsListService: ProjectsListService
  ) {
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
    });

    this.headerService.getMessages().subscribe(messages => {
      this.messages = messages;
    });

    this.headerService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });

    this._initProjectSearch();
  }

  toggleMenu() {
    this.navigationService.toggleCollapse();
  }

  signOut() {
    this.authService.signOut();
  }

  setLanguage(language: string) {
    //TODO Handle langauge switch
    console.log('switching to ' + language);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  projectSearchFc: FormControl;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  projectOptions: Project[];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  filteredProjectOptions: Project[];

  private _initProjectSearch(): void {
    this.projectSearchFc = new FormControl();
    this.projectsListService.getProjects().subscribe(res => {
      this.projectOptions = res;
      this.projectSearchFc.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterProjects(value))
        ).subscribe();
    });
  }

  private _filterProjects(searchKey): void {
    if (searchKey === '') {
      this.filteredProjectOptions = this.projectOptions;
    } else {
      this.filteredProjectOptions = this.projectOptions.filter(
        item =>
          item.title
            .toLowerCase()
            .includes(searchKey.toLowerCase()) === true
      );
    }
  }

}
