import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import {
  MeasureDictionary,
  MeasureMode
} from '../../../../store/measure/measure.reducers';
import { Observable } from 'rxjs';
import * as fromMangol from '../../../../store/mangol.reducers';
import { MatSelectChange } from '@angular/material';
import * as MeasureActions from '../../../../store/measure/measure.actions';

@Component({
  selector: 'mangol-measure-select',
  templateUrl: './measure-select.component.html',
  styleUrls: ['./measure-select.component.scss']
})
export class MeasureSelectComponent implements OnInit {
  @Input()
  dictionary: MeasureDictionary;

  modes$: Observable<MeasureMode[]>;
  selectedMode$: Observable<MeasureMode>;

  constructor(private store: Store<fromMangol.MangolState>) {
    this.modes$ = this.store.select(fromMangol.getMeasureModes);
    this.selectedMode$ = this.store.select(fromMangol.getMeasureMode);
  }

  ngOnInit() {}

  onSelectionChanged(evt: MatSelectChange) {
    if (typeof evt.value === 'undefined') {
      this.store.dispatch(new MeasureActions.SetMode(null));
    } else {
      const mode: MeasureMode = evt.value;
      this.store.dispatch(new MeasureActions.SetMode(mode));
    }
  }
}
