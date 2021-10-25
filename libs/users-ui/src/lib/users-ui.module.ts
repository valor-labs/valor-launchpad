import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Route} from '@angular/router';
import {UsersListingComponent} from './users-listing/users-listing.component';
import {UiModule} from '@valor-launchpad/ui';
import {ReactiveFormsModule} from '@angular/forms';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgSelectModule} from '@ng-select/ng-select';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TagInputModule} from 'ngx-chips';

export const usersUiRoutes: Route[] = [
  {path: 'listing', component: UsersListingComponent},
  {path: '', redirectTo: 'listing'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(usersUiRoutes),
    UiModule,
    TypeaheadModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDropdownModule,
    ModalModule,
    TagInputModule
  ],
  declarations: [
    UsersListingComponent
  ],
})
export class UsersUiModule {
}
