import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Pusher from 'pusher-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification$: Subject<any> = new Subject<any>();
  pusher: any;
  channel: any;

  constructor() {}

  listen(userId: number) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster
    });

    this.channel = this.pusher.subscribe(userId.toString());

    this.channel.bind('like', (data: any) => {
      this.setNotification(data.notification);
    })
  }

  setNotification(notifications: any) {
    this.notification$.next(notifications);
  }
}
