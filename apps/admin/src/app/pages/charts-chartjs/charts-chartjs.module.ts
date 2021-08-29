import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsChartjsComponent } from './charts-chartjs.component';
import { ChartsChartjsRoutingModule } from './charts-chartjs-routing.module';
import { UiModule } from '@valor-launchpad/ui';
import { BarChartModule, LineChartModule, PieChartModule, PolarChartModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    ChartsChartjsComponent
  ],
  imports: [
    CommonModule,
    ChartsChartjsRoutingModule,
    UiModule,
    LineChartModule,
    BarChartModule,
    PieChartModule,
    PolarChartModule
  ]
})
export class ChartsChartjsModule { }
