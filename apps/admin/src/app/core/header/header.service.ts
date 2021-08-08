import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Message,Notification} from '@valor-launchpad/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  
  constructor(private http:HttpClient) { }
  getMessages():Observable<Message[]>{
      return this.http.get<Message[]>('/api/users/v1/messages')

  }

  getNotifications():Observable<Notification[]>{
    return this.http.get<Notification[]>('/api/users/v1/notifications')
  }

  
}
