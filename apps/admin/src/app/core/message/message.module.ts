import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDropdownComponent } from './message-dropdown/message-dropdown.component';
import { UiModule } from '@valor-launchpad/ui';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MessageDropdownComponent],
  imports: [CommonModule, UiModule, RouterModule],
  exports: [MessageDropdownComponent],
})
export class MessageModule {}
