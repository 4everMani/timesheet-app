import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { timestamp } from 'rxjs';
import { TimeSheet } from 'src/app/models/timesheet';
import { TimesheetService } from '../service/timesheet.service';
import { Firestore, Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-hours',
  templateUrl: './add-hours.component.html',
  styleUrls: ['./add-hours.component.scss'],
})
export class AddHoursComponent implements OnInit {
  public timesheetForm!: FormGroup;

  @Input() user?: User;

  constructor(
    private fb: FormBuilder,
    private timesheetService: TimesheetService,
    private route: Router
  ) {
    this.timesheetForm = this.fb.group({
      startDate: [null, Validators.required],
      startTime: [null, Validators.required],
      endDate: [null, Validators.required],
      endTime: [null, Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  public addTimesheet(): void {
    const timesheet: Partial<TimeSheet> = {
      createdByName: this.user?.name,
      createdByEmail: this.user?.email,
      description: this.timesheetForm.get('description')?.value,
      endDate: Timestamp.fromDate(
        moment(this.timesheetForm.get('endDate')?.value).toDate()
      ),
      endTime: this.timesheetForm.get('endTime')?.value,
      startDate: Timestamp.fromDate(
        moment(this.timesheetForm.get('startDate')?.value).toDate()
      ),
      startTime: this.timesheetForm.get('startTime')?.value,
      status: 'In Progress',
      type: 'workingHour',
    };
    this.timesheetService.addTimesheet(timesheet).subscribe((res) => {
      this.route.navigateByUrl('timesheet');
    });
  }
}
