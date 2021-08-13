import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModule } from "@valor-launchpad/ui";
import { DashboardSocialRoutingModule } from './dashboard-social-routing.module';
import { DashboardSocialComponent } from './dashboard-social.component';
import { SocialStoryComponent } from './social-story/social-story.component';
import { TimeAgoPipe } from './time-ago.pipe';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SocialActivityComponent } from './social-activity/social-activity.component';


@NgModule({
  declarations: [
    DashboardSocialComponent,
    SocialStoryComponent,
    TimeAgoPipe,
    SocialActivityComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    DashboardSocialRoutingModule,
    BsDropdownModule
  ]
})
export class DashboardSocialModule { }
