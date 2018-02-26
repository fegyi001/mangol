import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FeatureIntoService {
  constructor(private http: Http) {}

  getFeatureInfo(url: string) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .get(url, {
        headers: headers
      })
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch((error: Response) => {
        console.log(error);
        return Observable.throw(error);
      });
  }
}
