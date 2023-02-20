import { Component, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/Authentication/auth.service';
import { TimeSheet } from 'src/app/models/timesheet';
import { User } from 'src/app/models/user';
import { TimesheetService } from '../service/timesheet.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent implements OnInit {
  public timesheetObs!: Observable<TimeSheet[]>;
  public leaveObs!: Observable<TimeSheet[]>;
  public approvedObs!: Observable<TimeSheet[]>;
  public declinedObs!: Observable<TimeSheet[]>;
  public isAdmin = false;
  public user?: User;
  constructor(
    private timesheetService: TimesheetService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.authService.user$.subscribe((user) => {
      if (user?.isAdmin) {
        const allRecords$ = this.timesheetService.getAllInProgressTimesheet();
        this.isAdmin = true;
        this.user = user;
        this.setData(allRecords$);
      } else if (user?.id) {
        const allRecords$ = this.timesheetService.getTimesheetByEmail(
          user?.email!
        );
        this.setData(allRecords$);
      }
    });
  }

  private setData(timeshhetList$: Observable<TimeSheet[]>): void {
    this.approvedObs = timeshhetList$.pipe(
      map((res) => {
        return res.filter((t) => t.status === 'approved');
      })
    );

    this.declinedObs = timeshhetList$.pipe(
      map((res) => {
        return res.filter((t) => t.status === 'declined');
      })
    );

    this.leaveObs = timeshhetList$.pipe(
      map((res) => {
        return res.filter(
          (t) => t.type === 'leave' && t.status === 'In Progress'
        );
      })
    );

    this.timesheetObs = timeshhetList$.pipe(
      map((res) => {
        return res.filter(
          (t) => t.type === 'workingHour' && t.status === 'In Progress'
        );
      })
    );
  }
}
