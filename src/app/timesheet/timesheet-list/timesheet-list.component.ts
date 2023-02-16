import { Component, Input, OnInit } from '@angular/core';
import { TimeSheet } from 'src/app/models/timesheet';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.scss'],
})
export class TimesheetListComponent implements OnInit {
  @Input() timesheetList?: TimeSheet[];

  constructor() {}

  ngOnInit(): void {}
}
