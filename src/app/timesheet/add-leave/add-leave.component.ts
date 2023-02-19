import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { Timestamp } from 'firebase/firestore';
import * as moment from 'moment';
import {
  catchError,
  concatMap,
  last,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { TimeSheet } from 'src/app/models/timesheet';
import { User } from 'src/app/models/user';
import { TimesheetService } from '../service/timesheet.service';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.scss'],
})
export class AddLeaveComponent implements OnInit {
  public timesheetForm!: FormGroup;

  public percentageChanges$!: Observable<number | undefined>;

  @Input() user?: User;

  constructor(
    private fb: FormBuilder,
    private timesheetService: TimesheetService,
    private route: Router,
    private store: AngularFireStorage
  ) {
    this.timesheetForm = this.fb.group({
      startDate: [null, Validators.required],
      startTime: ['09:00'],
      endDate: [null, Validators.required],
      endTime: ['17:00'],
      description: ['', Validators.required],
      documentUrl: [''],
    });
  }

  ngOnInit(): void {}

  public uploadDocument(event: any): void {
    const file: File = event.target.files[0];
    const filePath = `document/${file.name}`;

    const task = this.store.upload(filePath, file, {
      cacheControl: 'max-age=259200, public',
    });

    this.percentageChanges$ = task.percentageChanges();

    task
      .snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.store.ref(filePath).getDownloadURL()),
        tap((url) => {
          this.timesheetForm.patchValue({ documentUrl: url });
        }),
        catchError((err) => {
          alert(`couldn't upload document`);
          return throwError(err);
        })
      )
      .subscribe();
  }

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
      type: 'leave',
      documentUrl: this.timesheetForm.get('documentUrl')?.value,
    };
    console.log(timesheet);
    this.timesheetService.addTimesheet(timesheet).subscribe((res) => {
      this.route.navigateByUrl('timesheet');
    });
  }
}
