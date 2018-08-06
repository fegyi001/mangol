import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { CursorMode } from '../../../interfaces/cursor-mode';
import { MangolState } from '../../../mangol.state';
import { SetCursorLayer } from '../../../store/cursor.state';

@Component({
  selector: 'mangol-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements OnInit, OnDestroy {
  map$: Observable<Map>;
  layer$: Observable<VectorLayer>;
  mode$: Observable<CursorMode>;
  visible$: Observable<boolean>;

  combinedSubscription: Subscription;

  constructor(private store: Store) {
    this.map$ = this.store.select((state: MangolState) => state.map.map);
    this.layer$ = this.store.select((state: MangolState) => state.cursor.layer);
    this.mode$ = this.store.select((state: MangolState) => state.cursor.mode);
    this.visible$ = this.store.select(
      (state: MangolState) => state.cursor.visible
    );
  }

  ngOnInit() {
    this.map$.pipe(filter(m => m !== null)).subscribe(m => {
      const layer = new VectorLayer({
        source: new VectorSource(),
        zIndex: 1000000,
        style: feat => this.setStyle(<Feature>feat)
      });
      this.store.dispatch(new SetCursorLayer(layer));
      m.addLayer(layer);
      m.on('pointermove', evt => this.onMouseMove(evt));
    });

    this.combinedSubscription = combineLatest(
      this.layer$.pipe(filter(layer => layer !== null)),
      this.visible$
    ).subscribe(([layer, visible]) => {
      layer.setVisible(visible);
    });
  }

  ngOnDestroy() {
    if (this.combinedSubscription) {
      this.combinedSubscription.unsubscribe();
    }
  }

  private setStyle(feature: Feature): Style {
    const mode = this.store.selectSnapshot(
      (state: MangolState) => state.cursor.mode
    );
    return new Style({
      text: new Text({
        font: '12px Roboto, sans-serif',
        text: this.getText(mode),
        fill: new Fill({
          color:
            mode !== null && mode.hasOwnProperty('color') ? mode.color : 'white'
        }),
        backgroundFill: new Fill({
          color:
            mode !== null && mode.hasOwnProperty('backgroundFill')
              ? mode.backgroundFill
              : [0, 0, 0, 0.6]
        }),
        padding: [5, 8, 5, 8],
        rotateWithView: true,
        offsetX: 20,
        offsetY: -20,
        textAlign: 'left'
      })
    });
  }

  private onMouseMove(evt: any) {
    const mode = this.store.selectSnapshot(
      (state: MangolState) => state.cursor.mode
    );
    const layer = this.store.selectSnapshot(
      (state: MangolState) => state.cursor.layer
    );
    const feat = new Feature({
      geometry: new Point(evt.coordinate)
    });
    layer.getSource().clear();
    layer.getSource().addFeature(feat);
  }

  private getText(mode: CursorMode): string {
    return mode !== null ? mode.text : null;
  }
}
