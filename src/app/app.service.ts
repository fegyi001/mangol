import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppService {
  sidebarOpenedSubject = new BehaviorSubject<boolean>(null);

  constructor() {}
}
