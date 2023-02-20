import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
import { LoaderService } from 'src/app/loader/loader.service';
import { TimeSheet } from 'src/app/models/timesheet';
import { convertSnaps } from './db-util';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  constructor(
    private db: AngularFirestore,
    private loaderService: LoaderService
  ) {}

  public addTimesheet(timesheet: Partial<TimeSheet>): Observable<any> {
    const ref = this.db.collection<TimeSheet>('timesheets').add(timesheet);
    return from(ref).pipe(
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
    changes: Partial<TimeSheet>
  ): Observable<any> {
    this.loaderService.setLoader(true);
    return from(this.db.doc(`timesheets/${id}`).update(changes));
  }
}
