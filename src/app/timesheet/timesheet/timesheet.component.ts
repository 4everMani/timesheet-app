import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimeSheet } from 'src/app/models/timesheet';
import { TimesheetService } from '../service/timesheet.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent implements OnInit {
  public timesheetObs!: Observable<TimeSheet[]>;
  constructor(private timesheetService: TimesheetService) {}

  ngOnInit(): void {
    this.loadTimesheets();
  }

  public loadTimesheets() {
    this.timesheetObs = this.timesheetService.getAllInProgressTimesheet();
  }
}
