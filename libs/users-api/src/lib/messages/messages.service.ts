import { Injectable } from '@nestjs/common';
import {Message} from '@valor-launchpad/api-interfaces';


import {Messages} from './fakedata';


@Injectable()
export class MessagesService {
  messages:Message[]=Messages
 
  async getMessages(userId, actingUser):Promise<Message[]> {
    return await this.messages;
  }
}
