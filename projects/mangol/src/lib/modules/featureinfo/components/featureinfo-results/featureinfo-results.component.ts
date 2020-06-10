import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { MangolLayer } from '../../../../classes/Layer';
import { FeatureinfoTableDialogComponent } from '../featureinfo-table-dialog/featureinfo-table-dialog.component';
import * as CursorActions from './../../../../store/cursor/cursor.actions';
import * as FeatureinfoActions from './../../../../store/featureinfo/featureinfo.actions';
import { FeatureinfoDictionary } from './../../../../store/featureinfo/featureinfo.reducers';
import * as fromMangol from './../../../../store/mangol.reducers';
import { FeatureinfoService } from './../../featureinfo.service';

@Component({
  selector: 'mangol-featureinfo-results',
  templateUrl: './featureinfo-results.component.html',
  styleUrls: ['./featureinfo-results.component.scss'],
})
export class FeatureinfoResultsComponent implements OnInit, OnDestroy {
  @Input()
  dictionary: FeatureinfoDictionary;

  layer$: Observable<MangolLayer>;
  resultsLayer$: Observable<VectorLayer>;
  resultsFeatures$: Observable<Feature[]>;
  tab$: Observable<string>;

  combinedSubscription: Subscription;

  clickFunction: any = null;

  constructor(
    private store: Store<fromMangol.MangolState>,
    private featureinfoService: FeatureinfoService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.resultsLayer$ = this.store.select(
      (state) => state.featureinfo.resultsLayer
    );

    this.resultsFeatures$ = this.store.select(
      (state) => state.featureinfo.resultsItems
    );

    this.layer$ = this.store.select((state) => state.featureinfo.selectedLayer);

    this.tab$ = this.store.select((state) => state.sidebar.selectedModule);

    this.combinedSubscription = combineLatest([
      this.tab$,
      this.layer$,
    ]).subscribe(([selectedModule, layer]) => {
      this.store.dispatch(new FeatureinfoActions.SetResultsItems([]));
      if (selectedModule === 'featureinfo') {
        if (layer !== null) {
          this.store
            .select((state) => state.map.map)
            .pipe(take(1))
            .subscribe((m) => {
              this.store.dispatch(
                new CursorActions.SetMode({
                  text: this.dictionary.clickOnMap,
                  cursor: 'crosshair',
                })
              );
              this.store.dispatch(new CursorActions.SetVisible(true));
              if (this.clickFunction !== null) {
                m.un('singleclick', this.clickFunction);
              }
              this.clickFunction = (evt: any) =>
                this._createClickFunction(evt, layer, m);
              m.on('singleclick', this.clickFunction);
            });
        } else {
          this._removeClickFunction();
        }
      } else {
        this._removeClickFunction();
      }
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new CursorActions.ResetMode());
    this.resultsLayer$
      .pipe(
        filter((r) => r !== null),
        take(1)
      )
      .subscribe((r) => {
        this.store.dispatch(new FeatureinfoActions.SetResultsItems([]));
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
        .select((state) => state.map.map)
        .pipe(take(1))
        .subscribe((m) => {
          m.un('singleclick', this.clickFunction);
          this.clickFunction = null;
        });
    }
    this.store.dispatch(new CursorActions.ResetMode());
  }

  /**
   * Creates the clickFunction for a given singleclick event
   * @param evt
   * @param layer
   * @param m
   */
  private _createClickFunction(evt: any, layer: MangolLayer, m: Map) {
    this.store
      .select((state) => state.featureinfo.resultsLayer)
      .pipe(take(1))
      .subscribe((resultsLayer) => {
        try {
          m.removeLayer(resultsLayer);
        } catch (error) {}
        resultsLayer.getSource().clear();
        this.store.dispatch(new FeatureinfoActions.SetResultsItems([]));
        m.addLayer(resultsLayer);
        const coords = <[number, number]>evt.coordinate;
        if (layer.layer instanceof TileLayer) {
          this.featureinfoService
            .getFeatureinfoUrl$(layer, m, coords)
            .pipe(take(1))
            .subscribe((url) => {
              this.featureinfoService
                .getFeatureinfo(
                  <string>url,
                  layer.querySrs,
                  m.getView().getProjection().getCode()
                )
                .subscribe(
                  (features) => {
                    this.store.dispatch(
                      new FeatureinfoActions.SetResultsItems(features)
                    );
                    this._openSnackBar(features.length);
                  },
                  (error) => {
                    console.log(error);
                  }
                );
            });
        } else if (layer.layer instanceof VectorLayer) {
          const vectorFeatures: Feature[] = <Feature[]>m.getFeaturesAtPixel(
            evt.pixel,
            {
              layerFilter: (lay) => lay === <VectorLayer>layer.layer,
              hitTolerance: 5,
            }
          );
          this.store.dispatch(
            new FeatureinfoActions.SetResultsItems(vectorFeatures)
          );
          this._openSnackBar(vectorFeatures.length);
        } else {
          alert(`Feature info for layer is not yet supported`);
        }
      });
  }

  /**
   * Opens a snackbar with the number of features found
   * @param hits
   */
  private _openSnackBar(hits: number) {
    this.store
      .select((state) => state.featureinfo.snackbarDuration)
      .pipe(take(1))
      .subscribe((snackbarDuration) => {
        this.snackBar.open(
          `${this.dictionary.numberOfFeaturesFound}: ${hits}`,
          `${this.dictionary.closeSnackbar}`,
          {
            duration: snackbarDuration,
            panelClass: 'mangol-snackbar',
          }
        );
      });
  }

  /**
   * Retrieves the title for the individual feature
   * @param feature
   */
  getExpansionPanelTitle$(feature: Feature): Observable<string> {
    return this.store
      .select((state) => state.featureinfo.selectedLayer)
      .pipe(
        take(1),
        map((selectedLayer) => {
          const noPropTitle = this.dictionary.feature;
          if (!!selectedLayer.queryIdProperty) {
            const props = feature.getProperties();
            if (props.hasOwnProperty(selectedLayer.queryIdProperty)) {
              return props[selectedLayer.queryIdProperty].toString().length > 0
                ? props[selectedLayer.queryIdProperty]
                : noPropTitle;
            } else {
              return noPropTitle;
            }
          } else {
            return noPropTitle;
          }
        })
      );
  }

  /**
   * Opens a full table dialog
   */
  openTableDialog() {
    combineLatest([this.layer$, this.resultsFeatures$])
      .pipe(take(1))
      .subscribe(([layer, resultsFeatures]) => {
        this.dialog.open(FeatureinfoTableDialogComponent, {
          maxWidth: '90%',
          maxHeight: '90%',
          panelClass: 'mangol-dialog',
          autoFocus: false,
          data: {
            layer: layer,
            features: resultsFeatures,
            dictionary: this.dictionary,
          },
        });
      });
  }

  /**
   * Shows the feature on the map with a hover style
   * @param feature
   */
  showFeatureOnMap(feature: Feature) {
    this.resultsLayer$.pipe(take(1)).subscribe((layer) => {
      layer.getSource().addFeature(feature);
    });
  }

  /**
   * Hides the hovered feature on the map
   * @param feature
   */
  hideFeatureOnMap(feature: Feature) {
    this.resultsLayer$.pipe(take(1)).subscribe((layer) => {
      layer.getSource().removeFeature(feature);
    });
  }

  /**
   * Sets the view extent to a feature
   * @param feature
   */
  zoomToFeature(feature: Feature) {
    this.store
      .select((state) => state.map.map)
      .pipe(take(1))
      .subscribe((m) => {
        m.getView().fit(feature.getGeometry().getExtent(), {
          duration: 500,
        });
      });
  }
}
