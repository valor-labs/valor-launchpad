import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion/accordion.component';
import { AlertComponent } from './alert/alert.component';
import { AvatarComponent } from './avatar/avatar.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonComponent } from './button/button.component';
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
import { PaginationComponent } from './pagination/pagination.component';
import { ProgressComponent } from './progress/progress.component';
import { RebootComponent } from './reboot/reboot.component';
import { SettingsComponent } from './settings/settings.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SizingComponent } from './sizing/sizing.component';
import { StatsComponent } from './stats/stats.component';
import { TablesComponent } from './tables/tables.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TypeComponent } from './type/type.component';
import { WizardComponent } from './wizard/wizard.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { StepsComponent } from './wizard/steps/steps.component';
import { StepComponent } from './wizard/step/step.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RadioComponent } from './radio/radio.component';
import { RadioGroupComponent } from './radio/radio-group.component';
import { SwitchComponent } from './switch/switch.component';
import { InputDirective } from './input/input.directive';
import { IconDirective } from './icon/icon.directive';
import { InputGroupComponent } from './input-group/input-group.component';
import { FormItemComponent } from './forms/form-item.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
// import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsModule } from './tabs/tabs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldDirective } from './dynamic-form/components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FormButtonComponent } from './dynamic-form/components/form-button/form-button.component';
import { FormInputComponent } from './dynamic-form/components/form-input/form-input.component';
import { FormSelectComponent } from './dynamic-form/components/form-select/form-select.component';
import { RowDirective } from './grid/row.directive';
import { ColDirective } from './grid/col.directive';
import { EmbedVideoComponent } from './embed-video/embed-video.component';
import { SafePipe } from './pipe/safe.pipe';
import { SlateImageComponent, EditorSlateComponent } from './editor-slate/editor-slate.component';
import { EditorSlateTextComponent } from './editor-slate/components/text/editor-slate-text.component';
import { SlateModule } from 'slate-angular';
import { EditorSlateButtonComponent } from './editor-slate/components/button/editor-slate-button.component';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleDirective,
  CardContentDirective,
  CardImageDirective,
  CardSubTitleDirective,
} from './card';
import { RouterModule } from '@angular/router';
import { DropdownMegaMenuComponent } from './dropdown/dropdown-mega-menu/dropdown-mega-menu.component';
import { DropdownActionsMenuComponent } from './dropdown/dropdown-actions-menu/dropdown-actions-menu.component';
import { DropdownActionComponent } from './dropdown/dropdown-action/dropdown-action.component';
import { NOTYFToken, notyfFactory } from './notyf';
import { FormLabelComponent } from './forms/form-label.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TypographyDirective } from './typography/typography.directive';
import { CreasePipe } from './pipe/crease.pipe';
import { PercentBadgeComponent } from './badge/percent-badge/percent-badge.component';
import { ValorImagePipe } from './pipe/valor-image.pipe';
import { TimeAgoPipe } from './pipe/time-ago.pipe';
import { FullNamePipe } from './pipe/full-name.pipe';
import { ValorDatePipe } from './pipe/valor-date.pipe';
import { PhoneValidationComponent } from './phone-validation/phone-validation.component';
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";

const cardPart = [
  CardComponent,
  CardHeaderComponent,
  CardTitleDirective,
  CardContentDirective,
  CardImageDirective,
  CardSubTitleDirective,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AlertModule,
    PaginationModule,
    ProgressbarModule,
    TabsModule,
    ReactiveFormsModule,
    FormsModule,
    SlateModule,
    NgxIntlTelInputModule
  ],
  declarations: [
    AccordionComponent,
    AlertComponent,
    AvatarComponent,
    BadgeComponent,
    ButtonComponent,
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
    PaginationComponent,
    ProgressComponent,
    RebootComponent,
    SettingsComponent,
    SidebarComponent,
    SizingComponent,
    StatsComponent,
    TablesComponent,
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
    IconDirective,
    InputGroupComponent,
    FormItemComponent,
    FormLabelComponent,
    StepComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    RowDirective,
    ColDirective,
    EmbedVideoComponent,
    SafePipe,
    EditorSlateComponent,
    SlateImageComponent,
    EditorSlateTextComponent,
    EditorSlateButtonComponent,
    DropdownMegaMenuComponent,
    DropdownActionsMenuComponent,
    ...cardPart,
    DropdownActionComponent,
    SpinnerComponent,
    TypographyDirective,
    CreasePipe,
    ValorImagePipe,
    PercentBadgeComponent,
    TimeAgoPipe,
    FullNamePipe,
    ValorDatePipe,
    PhoneValidationComponent,
  ],
  exports: [
    TabsModule,
    AlertComponent,
    AvatarComponent,
    ButtonComponent,
    CarouselComponent,
    CarouselItemComponent,
    CheckboxGroupComponent,
    DropdownComponent,
    OffcanvasComponent,
    PaginationComponent,
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
    IconDirective,
    InputGroupComponent,
    FormItemComponent,
    FormLabelComponent,
    CheckboxComponent,
    DynamicFormComponent,
    RowDirective,
    ColDirective,
    ModalComponent,
    EmbedVideoComponent,
    EditorSlateComponent,
    BadgeComponent,
    DropdownMegaMenuComponent,
    DropdownActionsMenuComponent,
    ...cardPart,
    DropdownActionComponent,
    SpinnerComponent,
    TypographyDirective,
    CreasePipe,
    ValorImagePipe,
    PercentBadgeComponent,
    TimeAgoPipe,
    FullNamePipe,
    ValorDatePipe,
    PhoneValidationComponent
  ],
  providers: [{ provide: NOTYFToken, useFactory: notyfFactory }],
})
export class UiModule {}
