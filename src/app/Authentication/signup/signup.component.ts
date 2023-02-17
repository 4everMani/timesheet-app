import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private route: Router
  ) {
    this.signupForm = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      isAdmin: [false],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  public onSignup(): void {
    const user = this.signupForm.value as User;
    this.authService.signup(user).subscribe((res) => {
      this.route.navigateByUrl('timesheet');
    });
  }
}
