import { Injectable } from '@nestjs/common';
import {Notification} from '@valor-launchpad/api-interfaces';


import {Notifications} from './fakedata';


@Injectable()
export class NotificationsService {
  notifications:Notification[]=Notifications
 
  async getNotifications(userId, actingUser):Promise<Notification[]> {
    return await this.notifications
  }
}
