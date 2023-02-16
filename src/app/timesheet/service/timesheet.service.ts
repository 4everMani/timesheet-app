import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
import { TimeSheet } from 'src/app/models/timesheet';
import { convertSnaps } from './db-util';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  constructor(private db: AngularFirestore) {}

  public addTimesheet(timesheet: Partial<TimeSheet>): Observable<any> {
    const ref = this.db
      .collection<TimeSheet>('timesheet-collection')
      .add(timesheet);
    return from(ref).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getAllInProgressTimesheet(): Observable<TimeSheet[]> {
    return this.db
      .collection<TimeSheet>('timesheet-collection')
      .get()
      .pipe(
        map((res) => {
          return convertSnaps<TimeSheet>(res);
        })
      );
  }
}
