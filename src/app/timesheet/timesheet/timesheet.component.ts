import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
        this.timesheetObs = this.timesheetService.getAllInProgressTimesheet();
        this.isAdmin = true;
        this.user = user;
      } else {
        this.timesheetObs = this.timesheetService.getTimesheetByEmail(
          user?.email!
        );
      }
    });
  }
}
