import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { SwPush } from '@angular/service-worker';
import { Observable, Subscription } from 'rxjs';
import { PUBLIC_VAPID_KEY_OF_SERVER } from './app.constants';
import { AuthService } from './Authentication/auth.service';
import { LoaderService } from './loader/loader.service';
import { User } from './models/user';
import { NotificationService } from './notifications.service';
// import webpush = require('web-push');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public user$!: Observable<User | undefined>;

  public loader$!: Observable<boolean>;

  public message: any;

  private requestSubscription!: Subscription;

  private responseSubscription!: Subscription;

  constructor(
    public authService: AuthService,
    private loaderService: LoaderService,
    private pushService: SwPush, // private webpush:
    private notificationService: NotificationService
  ) {}
  ngOnDestroy(): void {
    this.requestSubscription.unsubscribe();
    this.responseSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.user$ = this.authService.user$;
    this.loader$ = this.loaderService.enableLoader$;
    this.handleNotifications();
  }

  async handleNotifications() {
    try {
      const sub = await this.pushService.requestSubscription({
        serverPublicKey: PUBLIC_VAPID_KEY_OF_SERVER,
      }).then;
      console.log('Subscribed');
    } catch (err) {
      this.notificationService.sub = undefined;
      console.error('Could not subscribe due to:', err);
    }
    this.pushService.messages.subscribe((message) => {
      console.log(message);
    });
    this.pushService.notificationClicks.subscribe((message) => {
      console.log(message);
    });
    this.pushService.subscription.subscribe((subscription) => {
      this.notificationService.sub = subscription?.toJSON();
    });
  }
}
