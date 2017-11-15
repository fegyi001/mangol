import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class FeatureIntoService {

  constructor(private http: Http) {

  }

  getFeatureInfo(url: string) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.get(url, {
      headers: headers
    }).map(
      (response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch((error: Response) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

}
