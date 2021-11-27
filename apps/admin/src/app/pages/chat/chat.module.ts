import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ValorLaunchpadMessengerComponent } from './valor-launchpad-messenger/valor-launchpad-messenger.component';
import { ValorLaunchpadMessageComponent } from './valor-launchpad-message/valor-launchpad-message.component';
import { UiModule } from '@valor-launchpad/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateGroupModalComponent } from './create-group-modal/create-group-modal.component';
import { ThreadAvatarComponent } from './thread-avatar/thread-avatar.component';

@NgModule({
  declarations: [
    ChatComponent,
    ValorLaunchpadMessengerComponent,
    ValorLaunchpadMessageComponent,
    CreateGroupModalComponent,
    ThreadAvatarComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ChatModule {}
