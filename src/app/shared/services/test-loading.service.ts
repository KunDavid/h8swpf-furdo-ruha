import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestLoadingService {

  constructor() { }

  loadingWithPromise(email: any, password: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let i = 0;
      setTimeout(() => {
        if(email === 'david@gmail.com' && password === '123') {
          resolve(true);
        } else {
          reject(false);
        }
      }, 3000);
    });
  }
  loadingWithObservable(email: any, password: any): Observable<boolean> {
    return new Observable((subscriber: Subscriber<boolean>) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if(i == 3) {
          if(email === 'david@gmail.com' && password === '123') {
            subscriber.next(true);
            subscriber.complete();
          } else {
            subscriber.error(false);
          }
        };
      }, 1000);
    });
  }
}
