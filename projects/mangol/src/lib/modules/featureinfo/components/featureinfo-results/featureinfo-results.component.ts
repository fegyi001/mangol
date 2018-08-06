import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngxs/store';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { MangolLayer } from '../../../../classes/Layer';
import { MangolState } from '../../../../mangol.state';
import {
  ResetCursorMode,
  SetCursorMode,
  SetCursorVisible
} from '../../../../store/cursor.state';
import { FeatureinfoDictionary } from '../../../../store/featureinfo.state';
import { FeatureinfoService } from './../../featureinfo.service';
import Feature from 'ol/Feature';

@Component({
  selector: 'mangol-featureinfo-results',
  templateUrl: './featureinfo-results.component.html',
  styleUrls: ['./featureinfo-results.component.scss']
})
export class FeatureinfoResultsComponent implements OnInit, OnDestroy {
  @Input() dictionary: FeatureinfoDictionary;

  layer$: Observable<MangolLayer>;
  resultsLayer$: Observable<VectorLayer>;

  layerSubscription: Subscription;
  resultsLayerSubscription: Subscription;

  clickFunction: any = null;

  constructor(
    private store: Store,
    private featureinfoService: FeatureinfoService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.resultsLayer$ = this.store.select(
      (state: MangolState) => state.featureinfo.resultsLayer
    );

    this.layer$ = this.store.select(
      (state: MangolState) => state.featureinfo.selectedLayer
    );

    this.layerSubscription = this.layer$.subscribe(layer => {
      this.store
        .selectOnce((state: MangolState) => state.map.map)
        .subscribe(m => {
          this.store.dispatch(
            new SetCursorMode({
              text: this.dictionary.clickOnMap,
              cursor: 'crosshair'
            })
          );
          this.store.dispatch(new SetCursorVisible(true));
          // If there is a clickFunction already, first we have to delete it
          if (this.clickFunction !== null) {
            m.un('singleclick', this.clickFunction);
          }
          this.clickFunction = evt => this._createClickFunction(evt, layer, m);
          m.on('singleclick', this.clickFunction);
        });
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetCursorMode());
    this.resultsLayer$
      .pipe(
        filter(r => r !== null),
        take(1)
      )
      .subscribe(r => {
        r.getSource().clear();
      });
    if (this.layerSubscription) {
      this.layerSubscription.unsubscribe();
    }
    if (this.resultsLayerSubscription) {
      this.resultsLayerSubscription.unsubscribe();
    }
  }

  /**
   * Creates the clickFunction for a given singleclick event
   * @param evt
   * @param layer
   * @param m
   */
  private _createClickFunction(evt: any, layer: MangolLayer, m: Map) {
    const resultsLayer = this.store.selectSnapshot(
      (state: MangolState) => state.featureinfo.resultsLayer
    );
    try {
      m.removeLayer(resultsLayer);
    } catch (error) {}
    resultsLayer.getSource().clear();
    m.addLayer(resultsLayer);

    const coords = <[number, number]>evt.coordinate;
    switch (layer.layer['type']) {
      case 'TILE':
        const url = this.featureinfoService.getFeatureinfoUrl(layer, m, coords);
        this.featureinfoService
          .getFeatureinfo(
            url,
            layer.querySrs,
            m
              .getView()
              .getProjection()
              .getCode()
          )
          .subscribe(
            features => {
              resultsLayer.getSource().addFeatures(features);
              this._openSnackBar(features.length);
            },
            error => {
              console.log(error);
            }
          );
        break;
      case 'VECTOR':
        const l = <VectorLayer>layer.layer;
        const extent: [number, number, number, number] = [
          coords[0] - 100000,
          coords[1] - 100000,
          coords[0] + 100000,
          coords[1] + 100000
        ];
        l.getSource().forEachFeatureIntersectingExtent(extent, feat => {
          console.log(feat.getProperties());
        });

        break;
      default:
        alert(
          `Feature info for layer type '${
            layer.layer['type']
          }' is not yet supported`
        );
        break;
    }
  }

  /**
   * Opens a snackbar with the number of features found
   * @param hits
   */
  private _openSnackBar(hits: number) {
    this.snackBar.open(
      `${this.dictionary.numberOfFeaturesFound}: ${hits}`,
      `${this.dictionary.closeSnackbar}`,
      {
        duration: this.store.selectSnapshot(
          (state: MangolState) => state.featureinfo.snackbarDuration
        ),
        panelClass: 'mangol-featureinfo-snackbar'
      }
    );
  }
}
