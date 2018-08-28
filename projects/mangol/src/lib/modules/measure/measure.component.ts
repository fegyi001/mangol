import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { MeasureDictionary } from '../../store/measure/measure.reducers';
import * as fromMangol from '../../store/mangol.reducers';

@Component({
  selector: 'mangol-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss']
})
export class MeasureComponent implements OnInit, OnDestroy {
  dictionary$: Observable<MeasureDictionary>;

  constructor(private store: Store<fromMangol.MangolState>) {
    this.dictionary$ = this.store.select(state => state.measure.dictionary);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
