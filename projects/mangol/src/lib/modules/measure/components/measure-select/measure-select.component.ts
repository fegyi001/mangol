import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromMangol from '../../../../store/mangol.reducers';
import * as MeasureActions from '../../../../store/measure/measure.actions';
import {
  MeasureDictionary,
  MeasureMode,
} from '../../../../store/measure/measure.reducers';

@Component({
  selector: 'mangol-measure-select',
  templateUrl: './measure-select.component.html',
  styleUrls: ['./measure-select.component.scss'],
})
export class MeasureSelectComponent implements OnInit {
  @Input()
  dictionary: MeasureDictionary;

  modes$: Observable<MeasureMode[]>;
  selectedMode$: Observable<MeasureMode>;

  constructor(private store: Store<fromMangol.MangolState>) {
    this.modes$ = this.store.select((state) => state.measure.modes);
    this.selectedMode$ = this.store.select((state) => state.measure.mode);
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
