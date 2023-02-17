import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { concatMap, from, map, Observable } from 'rxjs';
import { User } from '../models/user';
import { convertSnaps } from '../timesheet/service/db-util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn$!: Observable<boolean>;
  public isLogout$!: Observable<boolean>;
  public user?: User;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private route: Router
  ) {
    this.isLoggedIn$ = afAuth.authState.pipe(map((user) => !!user));
    this.isLogout$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
    this.afAuth.authState
      .pipe(
        concatMap((res) => {
          if (res?.uid) {
            return this.db
              .collection('users', (ref) => ref.where('id', '==', res.uid))
              .get()
              .pipe(
                map((res) => {
                  const results = convertSnaps<User>(res);
                  this.user = results[0];
                  return this.user;
                })
              );
          }
          return from([]);
        })
      )
      .subscribe();
  }

  public signup(user: User): Observable<any> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(user.email!, user.password!)
    ).pipe(
      concatMap((res) => {
        user.id = res.user?.uid;
        user.password = '';
        return from(this.db.collection<User>('users').add(user)).pipe(
          map((r) => r.id)
        );
      })
    );
  }

  public login(user: User): Observable<User | undefined> {
    return from(
      this.afAuth.signInWithEmailAndPassword(user.email!, user.password!)
    ).pipe(
      concatMap((res) => {
        return this.db
          .collection('users', (ref) => ref.where('id', '==', res.user?.uid))
          .get()
          .pipe(
            map((res) => {
              const results = convertSnaps<User>(res);
              this.user = results[0];
              return this.user;
            })
          );
      })
    );
  }

  public logout() {
    this.user = undefined;
    this.afAuth.signOut();
    this.route.navigateByUrl('/login');
  }
}
