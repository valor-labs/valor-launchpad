import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiGeneralRoutingModule } from './ui-general-routing.module';
import { UiGeneralComponent } from './ui-general.component';
import {UiModule} from "@valor-launchpad/ui";
import {AccordionModule} from "ngx-bootstrap/accordion";
import {PopoverModule} from "ngx-bootstrap/popover";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";


@NgModule({
  declarations: [
    UiGeneralComponent
  ],
  imports: [
    CommonModule,
    UiGeneralRoutingModule,
    UiModule,
    AccordionModule,
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot()
  ]
})
export class UiGeneralModule { }
