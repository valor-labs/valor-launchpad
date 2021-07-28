import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { TabContentDirective } from '../tab/tab-content.directive';
import { TabTitleDirective } from '../tab/tab-title.directive';
import { TabComponent } from '../tab/tab.component';
import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [CommonModule],
  exports: [TabsComponent, TabComponent, TabTitleDirective, TabContentDirective],
  declarations: [TabsComponent, TabComponent, TabTitleDirective, TabContentDirective],
  providers: [],
})
export class TabsModule {
}
