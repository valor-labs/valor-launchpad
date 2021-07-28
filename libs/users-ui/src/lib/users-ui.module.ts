import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Route} from '@angular/router';
import {UsersListingComponent} from './users-listing/users-listing.component';
import {UiModule} from '@valor-launchpad/ui';
import {FormsModule} from '@angular/forms';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';

export const usersUiRoutes: Route[] = [
  {path: 'listing', component: UsersListingComponent},
  {path: '', redirectTo: 'listing'}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(usersUiRoutes),
    UiModule, FormsModule, NzTagModule, TypeaheadModule
  ],
  declarations: [
    UsersListingComponent
  ],
})
export class UsersUiModule {
}
