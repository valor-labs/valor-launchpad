import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsChartjsComponent } from './charts-chartjs.component';

const routes: Routes = [
  {
    path: '',
    component: ChartsChartjsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsChartjsRoutingModule { }
