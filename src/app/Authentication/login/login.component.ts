import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
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
    private route: Router
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  public onLogin(): void {
    const user = this.loginForm.value as User;
    this.authService
      .login(user)
      .pipe(
        catchError((err) => {
          alert(`Email or password dedn't match!`);
          return throwError(err);
        })
      )
      .subscribe((res) => {
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
      });
  }
}
