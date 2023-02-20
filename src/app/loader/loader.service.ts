import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public enableLoader$ = this.loaderSubject$.asObservable();
  constructor() {}

  public setLoader(flag: boolean): void {
    console.log('flag', flag);
    this.loaderSubject$.next(flag);
  }
}
