import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './Authentication/auth.service';
import { LoaderService } from './loader/loader.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public user$!: Observable<User | undefined>;

  public loader$!: Observable<boolean>;

  constructor(
    public authService: AuthService,
    private loaderService: LoaderService
  ) {}
  ngOnInit(): void {
    this.user$ = this.authService.user$;
    this.loader$ = this.loaderService.enableLoader$;
  }
}
