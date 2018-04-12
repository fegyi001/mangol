import 'rxjs/add/observable/throw';

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MangolFeatureIntoService {
  activateState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: Http) {}

  getFeatureInfo(url: string) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .get(url, {
        headers: headers
      })
      .pipe(
        map((response: Response) => {
          const resp = response.json();
          return resp;
        }),
        catchError((error: Response) => {
          console.log(error);
          return Observable.throw(error);
        })
      );
  }
}
