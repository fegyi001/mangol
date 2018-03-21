import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppService {
  public sidebarOpenedSubject = new BehaviorSubject<boolean>(null);

  constructor() {}
}
