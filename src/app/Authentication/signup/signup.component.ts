import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoaderService } from 'src/app/loader/loader.service';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private loaderService: LoaderService
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      isAdmin: [false],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  public onSignup(): void {
    this.loaderService.setLoader(true);
    const user = this.signupForm.value as User;
    this.authService
      .signup(user)
      .pipe(
        catchError((err) => {
          alert('Unable to create account');
          this.loaderService.setLoader(false);
          return throwError(err);
        })
      )
      .subscribe((res) => {
        this.loaderService.setLoader(false);
        this.authService.addPushNotificationCredentials(res!);
        this.route.navigateByUrl('timesheet');
      });
  }
}
