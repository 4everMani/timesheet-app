import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { time } from 'console';
import { LoaderService } from 'src/app/loader/loader.service';
import { TimeSheet } from 'src/app/models/timesheet';
import { User } from 'src/app/models/user';
import { TimesheetService } from '../service/timesheet.service';

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

  @Input()
  isApproveTab = false;

  @Input()
  isDeclineTab = false;

  @Output()
  statusChanges: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(
    private timesheetService: TimesheetService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {}

  public changeStatus(status: string): void {
    this.timesheet!.status = status;
    this.timesheetService
      .updateStatus(this.timesheet?.id!, this.timesheet!)
      .subscribe((res) => {
        this.loader.setLoader(false);
        this.statusChanges.emit(true);
      });
  }
}
