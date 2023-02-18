import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
import { User } from '../models/user';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn$!: Observable<boolean>;
  public isLogout$!: Observable<boolean>;
  private userSubject$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.userSubject$.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private route: Router
  ) {
    this.isLoggedIn$ = afAuth.authState.pipe(map((user) => !!user));
    this.isLogout$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
    this.afAuth.authState.subscribe((res) => {
      if (res?.uid) {
        this.userSubject$.next(this.credentialUserMapper(res));
      }
    });
  }

  public signup(user: User): Observable<string | undefined> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(user.email!, user.password!)
    ).pipe(
      map((res) => {
        res.user?.updateProfile({ displayName: user.name }).then();
        return res.user?.uid;
      })
    );
  }

  public login(user: User): Observable<string | undefined> {
    return from(
      this.afAuth.signInWithEmailAndPassword(user.email!, user.password!)
    ).pipe(map((res) => res.user?.uid));
  }

  public googleLogin(): Observable<string | undefined> {
    return from(this.afAuth.signInWithPopup(new GoogleAuthProvider())).pipe(
      map((res) => {
        return res.user?.uid;
      })
    );
  }

  public logout() {
    this.userSubject$.next(undefined);
    this.afAuth.signOut();
    this.route.navigateByUrl('/login');
  }

  private credentialUserMapper(credential: any): User {
    const user = new User();
    user.email = credential.email!;
    user.isAdmin = credential.email! === 'admin@tsm.com';
    user.name = credential.displayName!;
    user.id = credential.uid;
    return user;
  }
}
