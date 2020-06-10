import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { CursorMode } from '../../../interfaces/cursor-mode';
import * as CursorActions from './../../../store/cursor/cursor.actions';
import * as fromMangol from './../../../store/mangol.reducers';

@Component({
  selector: 'mangol-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss'],
})
export class CursorComponent implements OnInit, OnDestroy {
  map$: Observable<Map>;

  mode: CursorMode = null;
  layer: VectorLayer = null;

  combinedSubscription: Subscription;
  modeSubscription: Subscription;
  layerSubscription: Subscription;

  constructor(private store: Store<fromMangol.MangolState>) {
    this.map$ = this.store.select((state) => state.map.map);

    this.modeSubscription = this.store
      .select((state) => state.cursor.mode)
      .subscribe((mode) => (this.mode = mode));
    this.layerSubscription = this.store
      .select((state) => state.cursor.layer)
      .subscribe((layer) => (this.layer = layer));
  }

  ngOnInit() {
    this.map$.pipe(filter((m) => m !== null)).subscribe((m) => {
      const layer = new VectorLayer({
        source: new VectorSource(),
        zIndex: 1000,
        style: (feat) => this.setStyle(<Feature>feat),
      });
      this.store.dispatch(new CursorActions.SetLayer(layer));
      m.addLayer(layer);
      m.on('pointermove', (evt) => this.onMouseMove(evt));
    });

    this.combinedSubscription = combineLatest([
      this.store
        .select((state) => state.cursor.layer)
        .pipe(filter((layer) => layer !== null)),
      this.store.select((state) => state.cursor.visible),
    ]).subscribe(([layer, visible]) => {
      layer.setVisible(visible);
    });
  }

  ngOnDestroy() {
    if (this.combinedSubscription) {
      this.combinedSubscription.unsubscribe();
    }
    if (this.modeSubscription) {
      this.modeSubscription.unsubscribe();
    }
    if (this.layerSubscription) {
      this.layerSubscription.unsubscribe();
    }
  }

  private setStyle(feature: Feature): Style {
    return new Style({
      text: new Text({
        font: '12px Roboto, sans-serif',
        text: this.mode !== null ? this.mode.text : null,
        fill: new Fill({
          color:
            this.mode !== null && this.mode.hasOwnProperty('color')
              ? this.mode.color
              : 'white',
        }),
        backgroundFill: new Fill({
          color:
            this.mode !== null && this.mode.hasOwnProperty('backgroundFill')
              ? this.mode.backgroundFill
              : [0, 0, 0, 0.6],
        }),
        padding: [5, 8, 5, 8],
        rotateWithView: true,
        offsetX: 20,
        offsetY: -20,
        textAlign: 'left',
      }),
    });
  }

  private onMouseMove(evt: any) {
    const feat = new Feature({
      geometry: new Point(evt.coordinate),
    });
    this.layer.getSource().clear();
    this.layer.getSource().addFeature(feat);
  }
}
