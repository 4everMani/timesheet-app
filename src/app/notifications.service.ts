import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private url = 'https://notifier-1vsa.onrender.com/api';
  constructor(private http: HttpClient) {}

  public sub: any;

  notifications(title: string, body: string, sub: any) {
    const data = {
      publicKey:
        'BJwyHx0NHHxEO3GzZ-aSKCkfxD9ych_i2t2xHpZPSfVwQrZLCf0XDbwUo1ewaeyt0xihH8eKHf9jaGLzUvr77wA',
      privateKey: 'jJG9Mk2Zlkvo_TX_-868yE-3t2WY9qUnzBZzjzquyaM',
      sub: sub,
      notification: {
        notification: {
          title: title,
          body: body,
        },
      },
    };
    return lastValueFrom(this.http.post(`${this.url}/notifications`, { data }));
  }
}
