import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion/accordion.component';
import { AlertComponent } from './alert/alert.component';
import { AvatarComponent } from './avatar/avatar.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { ChartComponent } from './chart/chart.component';
import { ChatComponent } from './chat/chat.component';
import { ContentComponent } from './content/content.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsComponent } from './forms/forms.component';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { IllustrationsComponent } from './illustrations/illustrations.component';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProgressComponent } from './progress/progress.component';
import { RebootComponent } from './reboot/reboot.component';
import { SettingsComponent } from './settings/settings.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SizingComponent } from './sizing/sizing.component';
import { StatsComponent } from './stats/stats.component';
import { TablesComponent } from './tables/tables.component';
import { TabsComponent } from './tabs/tabs.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TypeComponent } from './type/type.component';
import { WizardComponent } from './wizard/wizard.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import {AlertModule} from "ngx-bootstrap/alert";

@NgModule({
    imports: [CommonModule, AlertModule],
  declarations: [
    AccordionComponent,
    AlertComponent,
    AvatarComponent,
    BadgeComponent,
    ButtonComponent,
    CardComponent,
    ChartComponent,
    ChatComponent,
    ContentComponent,
    DropdownComponent,
    FormsComponent,
    HamburgerComponent,
    IllustrationsComponent,
    LandingComponent,
    MainComponent,
    ModalComponent,
    NavbarComponent,
    ProgressComponent,
    RebootComponent,
    SettingsComponent,
    SidebarComponent,
    SizingComponent,
    StatsComponent,
    TablesComponent,
    TabsComponent,
    TimelineComponent,
    TypeComponent,
    WizardComponent,
    WrapperComponent
  ],
  exports: [
    AlertComponent,
  ],
})
export class UiModule {}
