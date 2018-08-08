import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import { MangolControllersZoomOptions } from '../../interfaces/config-map-controllers.interface';
import { MangolState } from '../../mangol.state';
import { MangolConfig } from './../../interfaces/config.interface';
import {
  ControllersSetShowRotation,
  ControllersSetRotationDictionary,
  ControllersSetShowRotationTooltip
} from '../../store/controllers.state';
import {
  ControllersReset,
  ControllersSetPositionPrecision,
  ControllersSetScalebar,
  ControllersSetShowPosition,
  ControllersSetShowTooltip,
  ControllersSetShowZoom,
  ControllersSetZoomDictionary,
  MangolControllersPositionStateModel,
  MangolControllersRotationStateModel
} from './../../store/controllers.state';

@Component({
  selector: 'mangol-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.scss']
})
export class ControllersComponent implements OnInit, OnDestroy {
  config$: Observable<MangolConfig>;
  hasSidebar$: Observable<boolean>;
  sidebarCollapsible$: Observable<boolean>;
  zoom$: Observable<MangolControllersZoomOptions>;
  position$: Observable<MangolControllersPositionStateModel>;
  rotation$: Observable<MangolControllersRotationStateModel>;

  configSubscription: Subscription;

  constructor(private store: Store) {
    this.config$ = this.store.select(
      (state: MangolState) => state.config.config
    );
    this.hasSidebar$ = this.store.select(
      (state: MangolState) => state.sidebar.hasSidebar
    );
    this.sidebarCollapsible$ = this.store.select(
      state => state.sidebar.collapsible
    );
    this.zoom$ = this.store.select(
      (state: MangolState) => state.controllers.zoom
    );
    this.position$ = this.store.select(
      (state: MangolState) => state.controllers.position
    );
    this.rotation$ = this.store.select(
      (state: MangolState) => state.controllers.rotation
    );
  }

  ngOnInit() {
    this.configSubscription = this.config$.subscribe(config => {
      this.store.dispatch(new ControllersReset());
      if (
        typeof config !== 'undefined' &&
        config !== null &&
        !!config.map &&
        !!config.map.controllers
      ) {
        if (!!config.map.controllers.zoom) {
          const zoomOptions = config.map.controllers.zoom;
          if (!!zoomOptions.show) {
            this.store.dispatch(new ControllersSetShowZoom(zoomOptions.show));
          }
          if (!!zoomOptions.dictionary) {
            this.store.dispatch(
              new ControllersSetZoomDictionary(zoomOptions.dictionary)
            );
          }
          if (!!zoomOptions.showTooltip) {
            this.store.dispatch(
              new ControllersSetShowTooltip(zoomOptions.showTooltip)
            );
          }
        }
        if (!!config.map.controllers.scalebar) {
          this.store.dispatch(
            new ControllersSetScalebar(config.map.controllers.scalebar)
          );
        }
        if (!!config.map.controllers.position) {
          const positionOptions = config.map.controllers.position;
          if (!!positionOptions.show) {
            this.store.dispatch(
              new ControllersSetShowPosition(positionOptions.show)
            );
          }
          if (!!positionOptions.precision) {
            this.store.dispatch(
              new ControllersSetPositionPrecision(positionOptions.precision)
            );
          }
        }
        if (!!config.map.controllers.rotation) {
          const rotationOptions = config.map.controllers.rotation;
          if (!!rotationOptions.show) {
            this.store.dispatch(
              new ControllersSetShowRotation(rotationOptions.show)
            );
          }
          if (!!rotationOptions.dictionary) {
            this.store.dispatch(
              new ControllersSetRotationDictionary(rotationOptions.dictionary)
            );
          }
          if (!!rotationOptions.showTooltip) {
            this.store.dispatch(
              new ControllersSetShowRotationTooltip(rotationOptions.showTooltip)
            );
          }
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }
}
