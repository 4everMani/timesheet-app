import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-leave-records',
  templateUrl: './leave-records.component.html',
  styleUrls: ['./leave-records.component.scss'],
})
export class LeaveRecordsComponent implements OnInit {
  constructor() {}

  @Input()
  user?: User;

  ngOnInit(): void {}
}
