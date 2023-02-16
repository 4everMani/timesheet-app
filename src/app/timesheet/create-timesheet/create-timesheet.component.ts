import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-timesheet',
  templateUrl: './create-timesheet.component.html',
  styleUrls: ['./create-timesheet.component.scss'],
})
export class CreateTimesheetComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
