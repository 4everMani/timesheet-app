import { Component, Input, OnInit } from '@angular/core';
import { TimeSheet } from 'src/app/models/timesheet';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-timesheet-records',
  templateUrl: './timesheet-records.component.html',
  styleUrls: ['./timesheet-records.component.scss'],
})
export class TimesheetRecordsComponent implements OnInit {
  @Input()
  timesheet?: TimeSheet;

  @Input()
  user?: User;

  constructor() {}

  ngOnInit(): void {}
}
