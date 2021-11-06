import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ValorLaunchpadMessengerComponent } from './valor-launchpad-messenger/valor-launchpad-messenger.component';
import { ValorLaunchpadMessageComponent } from './valor-launchpad-message/valor-launchpad-message.component';
import { UiModule } from '@valor-launchpad/ui';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatComponent,
    ValorLaunchpadMessengerComponent,
    ValorLaunchpadMessageComponent,
  ],
  imports: [CommonModule, ChatRoutingModule, UiModule, FormsModule],
})
export class ChatModule {}
