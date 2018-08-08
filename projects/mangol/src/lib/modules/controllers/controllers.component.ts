import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import { MangolControllersZoomOptions } from '../../interfaces/config-map-controllers.interface';
import { MangolState } from '../../mangol.state';
import { MangolConfig } from './../../interfaces/config.interface';
import {
  ControllersReset,
  ControllersSetPosition,
  ControllersSetScalebar,
  ControllersSetShowTooltip,
  ControllersSetShowZoom,
  ControllersSetZoomDictionary
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
          const zoom = config.map.controllers.zoom;
          if (!!zoom.show) {
            this.store.dispatch(new ControllersSetShowZoom(zoom.show));
          }
          if (!!zoom.dictionary) {
            this.store.dispatch(
              new ControllersSetZoomDictionary(zoom.dictionary)
            );
          }
          if (!!zoom.showTooltip) {
            this.store.dispatch(
              new ControllersSetShowTooltip(zoom.showTooltip)
            );
          }
        }
        if (!!config.map.controllers.scalebar) {
          this.store.dispatch(
            new ControllersSetScalebar(config.map.controllers.scalebar)
          );
        }
        if (!!config.map.controllers.position) {
          this.store.dispatch(
            new ControllersSetPosition(config.map.controllers.position)
          );
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
