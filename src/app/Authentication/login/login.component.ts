import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoaderService } from 'src/app/loader/loader.service';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private loaderService: LoaderService,
    private db: AngularFirestore
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  public onLogin(): void {
    const user = this.loginForm.value as User;
    this.loaderService.setLoader(true);
    this.authService
      .login(user)
      .pipe(
        catchError((err) => {
          alert(`Email or password dedn't match!`);
          this.loaderService.setLoader(false);
          return throwError(err);
        })
      )
      .subscribe((res) => {
        this.loaderService.setLoader(false);
        this.authService.addPushNotificationCredentials(user.email!);
        this.route.navigateByUrl('timesheet');
      });
  }

  public onGoogleLogin(): void {
    this.authService
      .googleLogin()
      .pipe(
        catchError((err) => {
          alert(`Google signin failed!`);
          return throwError(err);
        })
      )
      .subscribe((res) => {
        this.route.navigateByUrl('timesheet');
        if (res) {
          this.authService.addPushNotificationCredentials(res);
        }
      });
  }
}
