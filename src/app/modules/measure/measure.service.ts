import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MangolMeasureService {
  activateState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}
}
