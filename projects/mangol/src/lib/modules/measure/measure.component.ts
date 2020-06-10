import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import * as LayerActions from '../../store/layers/layers.actions';
import * as fromMangol from '../../store/mangol.reducers';
import * as MeasureActions from '../../store/measure/measure.actions';
import {
  MeasureDictionary,
  MeasureMode,
} from '../../store/measure/measure.reducers';
import { MangolConfigMeasureItem } from './../../interfaces/config-toolbar.interface';
import * as CursorActions from './../../store/cursor/cursor.actions';
import { MeasureService } from './measure.service';

@Component({
  selector: 'mangol-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss'],
})
export class MeasureComponent implements OnInit, OnDestroy {
  dictionary$: Observable<MeasureDictionary>;
  measureConfig$: Observable<MangolConfigMeasureItem>;
  map$: Observable<Map>;
  measureLayer$: Observable<VectorLayer>;
  measureMode$: Observable<MeasureMode>;

  measureConfigSubscription: Subscription;

  constructor(
    private store: Store<fromMangol.MangolState>,
    private measureService: MeasureService
  ) {
    this.dictionary$ = this.store.select((state) => state.measure.dictionary);
    this.measureConfig$ = this.store.select(
      (state) => state.config.config.sidebar.toolbar.measure
    );
    this.map$ = this.store
      .select((state) => state.map.map)
      .pipe(filter((m) => m !== null));
    this.measureLayer$ = this.store
      .select((state) => state.layers.measureLayer)
      .pipe(filter((measureLayer) => measureLayer !== null));
    this.measureMode$ = this.store.select((state) => state.measure.mode);

    this.measureConfigSubscription = this.measureConfig$.subscribe((config) => {
      if (config.hasOwnProperty('dictionary')) {
        this.store.dispatch(
          new MeasureActions.SetDictionary(config.dictionary)
        );
      }
    });
  }

  ngOnInit() {
    this.map$.pipe(take(1)).subscribe((m) => {
      const layer = new VectorLayer({
        source: new VectorSource(),
        style: (feature: Feature) => this.measureService.getStyle(feature),
      });
      m.addLayer(layer);
      this.store.dispatch(new LayerActions.SetMeasureLayer(layer));
    });
  }

  ngOnDestroy() {
    this._cleanUp();
    if (this.measureConfigSubscription) {
      this.measureConfigSubscription.unsubscribe();
    }
  }

  private _cleanUp() {
    combineLatest([this.map$, this.measureLayer$])
      .pipe(take(1))
      .subscribe(([m, measureLayer]) => {
        this.store.dispatch(new LayerActions.SetMeasureLayer(null));
        m.removeLayer(measureLayer);
        this.store.dispatch(new CursorActions.ResetMode());
      });
  }
}
