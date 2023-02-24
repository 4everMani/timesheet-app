import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { title } from 'process';
import { from, map, Observable, tap } from 'rxjs';
import { LoaderService } from 'src/app/loader/loader.service';
import { Notification } from 'src/app/models/notification';
import { TimeSheet } from 'src/app/models/timesheet';
import { NotificationService } from 'src/app/notifications.service';
import { convertSnaps } from './db-util';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  constructor(
    private db: AngularFirestore,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {}

  public addTimesheet(timesheet: Partial<TimeSheet>): Observable<any> {
    const ref = this.db.collection<TimeSheet>('timesheets').add(timesheet);
    return from(ref).pipe(
      tap((res) => {
        const title = 'New Timesheet Added';
        const body = `Created by ${timesheet.createdByName}(${timesheet.createdByEmail})`;
        this.getSubscription('admin@tsm.com', '', title, body);
      }),
      map((res) => {
        return res;
      })
    );
  }

  public getAllInProgressTimesheet(): Observable<TimeSheet[]> {
    return this.db
      .collection<TimeSheet>('timesheets')
      .get()
      .pipe(
        map((res) => {
          return convertSnaps<TimeSheet>(res);
        })
      );
  }

  public getTimesheetByEmail(email: string): Observable<TimeSheet[]> {
    return this.db
      .collection<TimeSheet>('timesheets', (ref) =>
        ref.where('createdByEmail', '==', email)
      )
      .get()
      .pipe(
        map((res) => {
          return convertSnaps<TimeSheet>(res);
        })
      );
  }

  public updateStatus(
    id: string,
    changes: Partial<TimeSheet>,
    email: string
  ): Observable<any> {
    this.loaderService.setLoader(true);
    return from(this.db.doc(`timesheets/${id}`).update(changes)).pipe(
      tap(() => {
        this.getSubscription(email, changes.status!, undefined, undefined);
      })
    );
  }

  public getSubscription(
    email: string,
    updateStatus: string,
    title: string | undefined,
    body: string | undefined
  ) {
    this.db
      .collection('notifications', (ref) => ref.where('email', '==', email))
      .get()
      .pipe(
        tap((res) => {
          res.forEach((ele) => {
            const data: any = ele.data();
            const sub = data.sub;
            console.log(sub, data, email);
            const displyTitle = title ?? 'Update on your timesheet';
            const displayBody = body ?? `Your timesheet got ${updateStatus}`;
            this.notificationService.notifications(
              displyTitle,
              displayBody,
              data.sub
            );
          });
        })
      )
      .subscribe();
  }
}
