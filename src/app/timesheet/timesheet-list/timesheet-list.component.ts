import { Component, Input, OnInit } from '@angular/core';
import { TimeSheet } from 'src/app/models/timesheet';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.scss'],
})
export class TimesheetListComponent implements OnInit {
  @Input() timesheetList?: TimeSheet[];

  @Input()
  user?: User;

  constructor() {}

  ngOnInit(): void {}
}
