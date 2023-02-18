import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Authentication/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-create-timesheet',
  templateUrl: './create-timesheet.component.html',
  styleUrls: ['./create-timesheet.component.scss'],
})
export class CreateTimesheetComponent implements OnInit {
  public user?: User;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  public loadUser(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }
}
