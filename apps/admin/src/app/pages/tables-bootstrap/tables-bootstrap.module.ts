import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesBootstrapComponent } from './tables-bootstrap.component';
import { TablesBootstrapRouting } from './tables-bootstrap.routing';

@NgModule({
  declarations: [TablesBootstrapComponent],
  imports: [CommonModule, TablesBootstrapRouting],
})
export class TablesBootstrapModule {}
