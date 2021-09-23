import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Route} from '@angular/router';
import {UsersListingComponent} from './users-listing/users-listing.component';
import {UiModule} from '@valor-launchpad/ui';
import {ReactiveFormsModule} from '@angular/forms';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgSelectModule} from '@ng-select/ng-select';

export const usersUiRoutes: Route[] = [
  {path: 'listing', component: UsersListingComponent},
  {path: '', redirectTo: 'listing'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(usersUiRoutes),
    UiModule,
    NzTagModule,
    TypeaheadModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [
    UsersListingComponent
  ],
})
export class UsersUiModule {
}
