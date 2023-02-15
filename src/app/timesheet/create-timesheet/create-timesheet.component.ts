import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-timesheet',
  templateUrl: './create-timesheet.component.html',
  styleUrls: ['./create-timesheet.component.scss'],
})
export class CreateTimesheetComponent implements OnInit {
  public timesheetForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.timesheetForm = this.fb.group({
      startDate: [Date.now, Validators.required],
      startTime: [Validators.required],
      endDate: [Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
}
