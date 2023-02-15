import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  public signup(user: User): void {
    from(
      this.afAuth.createUserWithEmailAndPassword(user.email!, user.password!)
    ).subscribe((res) => {
      console.log(res);
    });
  }
}
