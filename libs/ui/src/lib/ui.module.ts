import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion/accordion.component';
import { AlertComponent } from './alert/alert.component';
import { AvatarComponent } from './avatar/avatar.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { ChartComponent } from './chart/chart.component';
import { ChatComponent } from './chat/chat.component';
import { ContentComponent } from './content/content.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { IllustrationsComponent } from './illustrations/illustrations.component';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OffcanvasComponent } from './offcanvas/offcanvas.component';
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
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { StepsComponent } from './wizard/steps/steps.component';
import { StepComponent } from './wizard/step/step.component';
import {AlertModule} from "ngx-bootstrap/alert";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import { RadioComponent } from './radio/radio.component';
import { RadioGroupComponent } from './radio/radio-group.component';
import { SwitchComponent } from './switch/switch.component';
import { InputDirective } from './input/input.directive';
import { InputGroupComponent } from './input-group/input-group.component';
import { FormItemComponent } from './forms/form-item.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldDirective } from './dynamic-form/components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FormButtonComponent } from './dynamic-form/components/form-button/form-button.component';
import { FormInputComponent } from './dynamic-form/components/form-input/form-input.component';
import { FormSelectComponent } from './dynamic-form/components/form-select/form-select.component';
import { RowDirective } from './grid/row.directive';
import { ColDirective } from './grid/col.directive';

@NgModule({
    imports: [CommonModule, AlertModule, ProgressbarModule, TabsModule, ReactiveFormsModule],
  declarations: [
    AccordionComponent,
    AlertComponent,
    AvatarComponent,
    BadgeComponent,
    ButtonComponent,
    CardComponent,
    CarouselComponent,
    CarouselItemComponent,
    ChartComponent,
    ChatComponent,
    ContentComponent,
    DropdownComponent,
    HamburgerComponent,
    IllustrationsComponent,
    LandingComponent,
    MainComponent,
    ModalComponent,
    NavbarComponent,
    OffcanvasComponent,
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
    WrapperComponent,
    CheckboxGroupComponent,
    StepsComponent,
    StepComponent,
    RadioComponent,
    RadioGroupComponent,
    SwitchComponent,
    InputDirective,
    InputGroupComponent,
    FormItemComponent,
    StepComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    RowDirective,
    ColDirective,
  ],
  exports: [
    TabsModule,
    AlertComponent,
    AvatarComponent,
    ButtonComponent,
    CardComponent,
    CarouselComponent,
    CarouselItemComponent,
    CheckboxGroupComponent,
    DropdownComponent,
    OffcanvasComponent,
    ProgressComponent,
    TablesComponent,
    TimelineComponent,
    WizardComponent,
    StepsComponent,
    StepComponent,
    RadioComponent,
    RadioGroupComponent,
    SwitchComponent,
    InputDirective,
    InputGroupComponent,
    FormItemComponent,
    CheckboxComponent,
    DynamicFormComponent,
    RowDirective,
    ColDirective,
    ModalComponent,
  ]
})
export class UiModule {}
