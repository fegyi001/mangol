import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Store } from '@ngxs/store';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { MangolLayer } from '../../../../classes/Layer';
import { MangolState } from '../../../../mangol.state';
import {
  ResetCursorMode,
  SetCursorMode,
  SetCursorVisible
} from '../../../../store/cursor.state';
import {
  FeatureinfoDictionary,
  SetFeatureinfoResultsItems
} from '../../../../store/featureinfo.state';
import { FeatureinfoTableDialogComponent } from '../featureinfo-table-dialog/featureinfo-table-dialog.component';
import { FeatureinfoService } from './../../featureinfo.service';

@Component({
  selector: 'mangol-featureinfo-results',
  templateUrl: './featureinfo-results.component.html',
  styleUrls: ['./featureinfo-results.component.scss']
})
export class FeatureinfoResultsComponent implements OnInit, OnDestroy {
  @Input() dictionary: FeatureinfoDictionary;

  layer$: Observable<MangolLayer>;
  resultsLayer$: Observable<VectorLayer>;
  resultsFeatures$: Observable<Feature[]>;
  tab$: Observable<string>;

  combinedSubscription: Subscription;

  clickFunction: any = null;

  constructor(
    private store: Store,
    private featureinfoService: FeatureinfoService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.resultsLayer$ = this.store.select(
      (state: MangolState) => state.featureinfo.resultsLayer
    );

    this.resultsFeatures$ = this.store.select(
      (state: MangolState) => state.featureinfo.resultsItems
    );

    this.layer$ = this.store.select(
      (state: MangolState) => state.featureinfo.selectedLayer
    );

    this.tab$ = this.store.select(
      (state: MangolState) => state.sidebar.selectedModule
    );

    this.combinedSubscription = combineLatest(this.tab$, this.layer$).subscribe(
      ([selectedModule, layer]) => {
        this.store.dispatch(new SetFeatureinfoResultsItems([]));
        if (selectedModule === 'featureinfo') {
          if (layer !== null) {
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
                if (this.clickFunction !== null) {
                  m.un('singleclick', this.clickFunction);
                }
                this.clickFunction = evt =>
                  this._createClickFunction(evt, layer, m);
                m.on('singleclick', this.clickFunction);
              });
          } else {
            this._removeClickFunction();
          }
        } else {
          this._removeClickFunction();
        }
      }
    );
  }

  ngOnDestroy() {
    this.resultsLayer$
      .pipe(
        filter(r => r !== null),
        take(1)
      )
      .subscribe(r => {
        this.store.dispatch(new SetFeatureinfoResultsItems([]));
        r.getSource().clear();
      });
    if (this.combinedSubscription) {
      this.combinedSubscription.unsubscribe();
    }
  }

  /**
   * Removes the click funciton if needed, plus resets the cursor style
   */
  private _removeClickFunction() {
    if (this.clickFunction !== null) {
      this.store
        .selectOnce((state: MangolState) => state.map.map)
        .subscribe(m => {
          m.un('singleclick', this.clickFunction);
          this.clickFunction = null;
        });
    }
    this.store.dispatch(new ResetCursorMode());
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
    this.store.dispatch(new SetFeatureinfoResultsItems([]));
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
              this.store.dispatch(new SetFeatureinfoResultsItems(features));
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

  /**
   * Retrieves the title for the individual feature
   * @param feature
   */
  getExpansionPanelTitle(feature: Feature) {
    const noPropTitle = this.dictionary.feature;
    const layer = this.store.selectSnapshot(
      (state: MangolState) => state.featureinfo.selectedLayer
    );
    if (!!layer.queryIdProperty) {
      const props = feature.getProperties();
      if (props.hasOwnProperty(layer.queryIdProperty)) {
        return props[layer.queryIdProperty].toString().length > 0
          ? props[layer.queryIdProperty]
          : noPropTitle;
      } else {
        return noPropTitle;
      }
    } else {
      return noPropTitle;
    }
  }

  /**
   * Opens a full table dialog
   */
  openTableDialog() {
    combineLatest(this.layer$, this.resultsFeatures$)
      .pipe(take(1))
      .subscribe(([layer, resultsFeatures]) => {
        const dialogRef = this.dialog.open(FeatureinfoTableDialogComponent, {
          width: '90%',
          maxHeight: '90%',
          data: { layer: layer, features: resultsFeatures }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('dialog closed');
        });
      });
  }
}
