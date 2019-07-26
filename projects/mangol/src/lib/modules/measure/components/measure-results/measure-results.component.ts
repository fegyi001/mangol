import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Feature from 'ol/Feature';
import Circle from 'ol/geom/Circle';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import Draw, { DrawEvent } from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import * as CursorActions from '../../../../store/cursor/cursor.actions';
import * as fromMangol from '../../../../store/mangol.reducers';
import { MeasureMode } from '../../../../store/measure/measure.reducers';
import { MeasureService } from '../../measure.service';
import { MeasureDictionary } from './../../../../store/measure/measure.reducers';

@Component({
  selector: 'mangol-measure-results',
  templateUrl: './measure-results.component.html',
  styleUrls: ['./measure-results.component.scss']
})
export class MeasureResultsComponent implements OnInit, OnDestroy {
  @Input()
  dictionary: MeasureDictionary;
  map$: Observable<Map>;
  layer$: Observable<VectorLayer>;
  measureMode$: Observable<MeasureMode>;
  cursorText$: Observable<string>;

  combinedSubscription: Subscription;

  draw: Draw = null;
  initialText: string = null;
  displayValue: string = null;

  constructor(
    private store: Store<fromMangol.MangolState>,
    private measureService: MeasureService
  ) {
    this.map$ = this.store
      .select(state => state.map.map)
      .pipe(filter(m => m !== null));
    this.layer$ = this.store
      .select(state => state.layers.measureLayer)
      .pipe(filter(l => l !== null));
    this.measureMode$ = this.store
      .select(state => state.measure.mode)
      .pipe(filter(mode => mode !== null));
    this.cursorText$ = this.store.select(state => state.cursor.mode.text);
  }

  ngOnInit() {
    this.combinedSubscription = combineLatest(
      this.map$,
      this.layer$,
      this.measureMode$
    ).subscribe(([m, layer, mode]) => {
      const mapLayers = m.getLayers().getArray();
      let maxZIndex = mapLayers.length - 1;
      m.getLayers()
        .getArray()
        .forEach(l => {
          if (l !== layer) {
            maxZIndex = l.getZIndex() > maxZIndex ? l.getZIndex() : maxZIndex;
          }
        });
      layer.setZIndex(maxZIndex + 1);
      layer.getSource().clear();
      this._activateDraw(m, layer, mode);
    });
  }

  ngOnDestroy() {
    combineLatest(this.map$, this.layer$)
      .pipe(take(1))
      .subscribe(([m, layer]) => {
        this._deactivateDraw(m, layer);
      });
    this.store.dispatch(new CursorActions.ResetMode());
    if (this.combinedSubscription) {
      this.combinedSubscription.unsubscribe();
    }
  }

  private _activateDraw(map: Map, layer: VectorLayer, mode: MeasureMode) {
    this._deactivateDraw(map, layer);
    map.addLayer(layer);
    this.draw = new Draw({
      source: layer.getSource(),
      style: (feature: Feature) => this.measureService.getStyle(feature),
      type: mode.geometryName
    });
    this.initialText =
      (mode.type === 'radius'
        ? this.dictionary.drawStartTextRadius
        : this.dictionary.drawStartText) + '.';
    this.store.dispatch(
      new CursorActions.SetMode({
        text: this.initialText,
        cursor: 'crosshair'
      })
    );
    this.displayValue = this.initialText;
    this.draw.on('drawstart', (e: any) => {
      layer.getSource().clear();
      this.store.dispatch(
        new CursorActions.SetMode({
          text: this.initialText,
          cursor: 'crosshair'
        })
      );
      this.displayValue = null;
      const feature: Feature = e.feature;
      feature.on('change', (evt: any) => {
        const feat: Feature = evt.target;
        let displayValue: string = null;
        switch (mode.type) {
          case 'line':
            const lineString = <LineString>feat.getGeometry();
            displayValue = `${
              this.dictionary.distance
            }: ${this.measureService.exchangeMetersAndKilometers(
              lineString.getLength()
            )}.`;
            break;
          case 'area':
            const polygon = <Polygon>feat.getGeometry();
            displayValue = `${
              this.dictionary.area
            }: ${this.measureService.exchangeSqmetersAndSqkilometers(
              polygon.getArea()
            )}.`;
            break;
          case 'radius':
            const circle = <Circle>feat.getGeometry();
            this.store
              .select(state => state.controllers.position.coordinates)
              .pipe(take(1))
              .subscribe(position => {
                const center = circle.getCenter();
                const dx = position[0] - center[0];
                const dy = position[1] - center[1];
                // range (-PI, PI]
                let angle = Math.atan2(dy, dx);
                // rads to degs, range (-180, 180]
                angle *= 180 / Math.PI;
                // [0, 360]; clockwise; 0° = east
                angle = angle < 0 ? angle + 360 : angle;
                const displayAngle =
                  parseFloat(angle.toString()).toFixed(2) + '°';
                displayValue = `${
                  this.dictionary.radius
                }: ${this.measureService.exchangeMetersAndKilometers(
                  circle.getRadius()
                )}, ${this.dictionary.angle}: ${displayAngle}.`;
              });
            break;
          default:
            break;
        }
        this.store.dispatch(
          new CursorActions.SetMode({
            text: `${displayValue}\n${this.initialText}`,
            cursor: 'crosshair'
          })
        );
        this.displayValue = displayValue;
      });
    });

    this.draw.on('drawend', (e: DrawEvent) => {
      e.feature.setProperties({ text: this.displayValue });
      this.store.dispatch(
        new CursorActions.SetMode({
          text: this.dictionary.clickOnMap,
          cursor: 'crosshair'
        })
      );
    });

    this.draw.setActive(true);
    map.addInteraction(this.draw);
    this.store.dispatch(
      new CursorActions.SetMode({
        text: this.dictionary.clickOnMap,
        cursor: 'crosshair'
      })
    );
    this.displayValue = this.dictionary.clickOnMap;
  }

  private _deactivateDraw(map: Map, layer: VectorLayer) {
    this.displayValue = null;
    try {
      map.removeLayer(layer);
      map.removeInteraction(this.draw);
    } catch (error) {}
  }
}
