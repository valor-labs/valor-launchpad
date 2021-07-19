import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsApexchartsComponent } from './charts-apexcharts.component';
import { ChartsApexchartsRoutingModule } from './charts-apexcharts-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts'

@NgModule({
  declarations: [
    ChartsApexchartsComponent
  ],
  imports: [
    CommonModule,
    ChartsApexchartsRoutingModule,
    NgApexchartsModule
  ]
})
export class ChartsApexchartsModule { }
