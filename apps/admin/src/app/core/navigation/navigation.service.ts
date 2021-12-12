import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { Menu } from '@valor-launchpad/api-interfaces';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  lastUrl$: Observable<string>;
  collapseState$: Observable<boolean>;
  sideBarMenus$: Observable<Menu[]>;
  megaMenus$: Observable<Menu[]>;

  private lastUrl = new BehaviorSubject(null);
  private collapseState = new BehaviorSubject(false);
  private sideBarMenus = new BehaviorSubject([]);
  private megaMenus = new BehaviorSubject([]);

  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.collapseState$ = this.collapseState.asObservable();
    this.lastUrl$ = this.lastUrl.asObservable();
    this.sideBarMenus$ = this.sideBarMenus.asObservable();
    this.megaMenus$ = this.megaMenus.asObservable();
    router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((res: NavigationEnd) => {
        this.lastUrl.next(res.urlAfterRedirects);
      });
  }

  toggleCollapse() {
    this.collapseState.next(!this.collapseState.value);
  }

  getMenus() {
    return this.http
      .get<Menu[]>(this.config.environment.apiBase + 'api/users/v1/menus')
      .pipe(
        tap((res) => {
          const megaMenus = [];
          const menus = [];
          for (const item of res) {
            if (item.isMega) {
              megaMenus.push(item);
            } else {
              menus.push(item);
            }
          }
          this.authService.user
            .pipe(
              map((user) => {
                return user.userRoles.filter((role) => {
                  return role.rolesEntity.role === 'Admin';
                });
              }),
              map((user) => {
                // if user does not has admin role remove client page
                if (user.length === 0) {
                  menus.filter((item) => {
                    if (item.name === 'Pages') {
                      item.children.filter((el) => {
                        if (el.name === 'Pages') {
                          el.children = el.children.filter((e) => {
                            return e.name !== 'Clients';
                          });
                        }
                      });
                    }
                  });
                }
                return menus;
              })
            )
            .subscribe((menus) => {
              this.sideBarMenus.next(menus);
            });

          this.megaMenus.next(megaMenus);
        })
      );
  }
}
