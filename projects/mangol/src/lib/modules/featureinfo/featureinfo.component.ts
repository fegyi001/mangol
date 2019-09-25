import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { MangolLayer } from '../../classes/Layer';
import { StyleService } from '../_shared/shared/services/style.service';
import * as FeatureinfoActions from './../../store/featureinfo/featureinfo.actions';
import { FeatureinfoDictionary } from './../../store/featureinfo/featureinfo.reducers';
import * as fromMangol from './../../store/mangol.reducers';

@Component({
  selector: 'mangol-featureinfo',
  templateUrl: './featureinfo.component.html',
  styleUrls: ['./featureinfo.component.scss']
})
export class FeatureinfoComponent implements OnInit, OnDestroy {
  layers$: Observable<MangolLayer[]>;
  selectedLayer$: Observable<MangolLayer>;
  map$: Observable<Map>;
  resultsLayer$: Observable<VectorLayer>;
  dictionary$: Observable<FeatureinfoDictionary>;

  mapSubscription: Subscription;

  constructor(
    private store: Store<fromMangol.MangolState>,
    private styleService: StyleService
  ) {
    // Get the queryable layers
    this.layers$ = this.store.select(fromMangol.getQueryableLayers);
    // Get the selected layer
    this.selectedLayer$ = this.store.select(fromMangol.getFeatureSelectedLayer);
    this.map$ = this.store.select(fromMangol.getMap);
    this.resultsLayer$ = this.store.select(fromMangol.getFeatureResultsLayer);
    this.dictionary$ = this.store.select(fromMangol.getFeatureDictionary);
  }

  ngOnInit() {
    const resultsLayer = new VectorLayer({
      source: new VectorSource({
        features: []
      }),
      style: feat => this.styleService.hoverStyle(<Feature>feat)
    });

    // Add the resultsLayer to the map
    this.mapSubscription = this.map$
      .pipe(filter(m => m !== null))
      .subscribe(m => {
        m.addLayer(resultsLayer);
        this.store.dispatch(
          new FeatureinfoActions.SetResultsLayer(resultsLayer)
        );
      });
  }

  ngOnDestroy() {
    // Remove the resultsLayer from the map
    combineLatest(
      this.map$.pipe(filter(m => m !== null)),
      this.resultsLayer$.pipe(filter(r => r !== null))
    )
      .pipe(take(1))
      .subscribe(([m, resultsLayer]) => {
        m.removeLayer(resultsLayer);
      });
    if (this.mapSubscription) {
      this.mapSubscription.unsubscribe();
    }
  }
}
