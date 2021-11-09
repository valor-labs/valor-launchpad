import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDropdownComponent } from './message-dropdown/message-dropdown.component';
import { UiModule } from '@valor-launchpad/ui';

@NgModule({
  declarations: [MessageDropdownComponent],
  imports: [CommonModule, UiModule],
  exports: [MessageDropdownComponent],
})
export class MessageModule {}
