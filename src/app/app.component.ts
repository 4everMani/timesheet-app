import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './Authentication/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public user$!: Observable<User | undefined>;

  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }
}
