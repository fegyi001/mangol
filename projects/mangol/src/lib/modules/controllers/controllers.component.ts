import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'

import {
  MangolControllersFullScreenOptions,
  MangolControllersZoomOptions
} from '../../interfaces/config-map-controllers.interface'
import { MangolConfig } from './../../interfaces/config.interface'
import * as ControllersActions from './../../store/controllers/controllers.actions'
import {
  MangolControllersPositionStateModel,
  MangolControllersRotationStateModel
} from './../../store/controllers/controllers.reducers'
import * as fromMangol from './../../store/mangol.reducers'

@Component({
  selector: 'mangol-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.scss']
})
export class ControllersComponent implements OnInit, OnDestroy {
  config$: Observable<MangolConfig>
  hasSidebar$: Observable<boolean>
  sidebarCollapsible$: Observable<boolean>
  zoom$: Observable<MangolControllersZoomOptions>
  position$: Observable<MangolControllersPositionStateModel>
  rotation$: Observable<MangolControllersRotationStateModel>
  fullScreen$: Observable<MangolControllersFullScreenOptions>

  configSubscription: Subscription

  constructor(private store: Store<fromMangol.MangolState>) {
    this.config$ = this.store.select((state) => state.config.config)
    this.hasSidebar$ = this.store.select((state) => state.sidebar.hasSidebar)
    this.sidebarCollapsible$ = this.store.select(
      (state) => state.sidebar.collapsible
    )
    this.zoom$ = this.store.select((state) => state.controllers.zoom)
    this.position$ = this.store.select((state) => state.controllers.position)
    this.rotation$ = this.store.select((state) => state.controllers.rotation)
    this.fullScreen$ = this.store.select(
      (state) => state.controllers.fullScreen
    )
  }

  ngOnInit() {
    this.configSubscription = this.config$.subscribe((config) => {
      this.store.dispatch(new ControllersActions.Reset())
      if (
        typeof config !== 'undefined' &&
        config !== null &&
        !!config.map &&
        !!config.map.controllers
      ) {
        /**
         * Zoom buttons config
         */
        if (!!config.map.controllers.zoom) {
          const zoomOptions = config.map.controllers.zoom
          if (!!zoomOptions.show) {
            this.store.dispatch(
              new ControllersActions.SetShowZoom(zoomOptions.show)
            )
          }
          if (!!zoomOptions.dictionary) {
            this.store.dispatch(
              new ControllersActions.SetZoomDictionary(zoomOptions.dictionary)
            )
          }
          if (!!zoomOptions.showTooltip) {
            this.store.dispatch(
              new ControllersActions.SetShowTooltip(zoomOptions.showTooltip)
            )
          }
        }
        /**
         * Scalebar config (not yet implemented)
         */
        if (!!config.map.controllers.scalebar) {
          this.store.dispatch(
            new ControllersActions.SetScalebar(config.map.controllers.scalebar)
          )
        }
        /**
         * Mouse position config
         */
        if (!!config.map.controllers.position) {
          const positionOptions = config.map.controllers.position
          if (!!positionOptions.show) {
            this.store.dispatch(
              new ControllersActions.SetShowPosition(positionOptions.show)
            )
          }
          if (!!positionOptions.precision) {
            this.store.dispatch(
              new ControllersActions.SetPositionPrecision(
                positionOptions.precision
              )
            )
          }
          if (!!positionOptions.dictionary) {
            this.store.dispatch(
              new ControllersActions.SetPositionDictionary(
                positionOptions.dictionary
              )
            )
          }
        }
        /**
         * Rotation button config
         */
        if (!!config.map.controllers.rotation) {
          const rotationOptions = config.map.controllers.rotation
          if (!!rotationOptions.show) {
            this.store.dispatch(
              new ControllersActions.SetShowRotation(rotationOptions.show)
            )
          }
          if (!!rotationOptions.dictionary) {
            this.store.dispatch(
              new ControllersActions.SetRotationDictionary(
                rotationOptions.dictionary
              )
            )
          }
          if (!!rotationOptions.showTooltip) {
            this.store.dispatch(
              new ControllersActions.SetShowRotationTooltip(
                rotationOptions.showTooltip
              )
            )
          }
        }
        /**
         * Fullscreen button config
         */
        if (!!config.map.controllers.fullScreen) {
          const fullscreenOptions = config.map.controllers.fullScreen
          if (fullscreenOptions.hasOwnProperty('show')) {
            this.store.dispatch(
              new ControllersActions.SetShowFullscreen(fullscreenOptions.show)
            )
          }
          if (fullscreenOptions.hasOwnProperty('dictionary')) {
            this.store.dispatch(
              new ControllersActions.SetFullscreenDictionary(
                fullscreenOptions.dictionary
              )
            )
          }
          if (fullscreenOptions.hasOwnProperty('showTooltip')) {
            this.store.dispatch(
              new ControllersActions.SetShowFullscreenTooltip(
                fullscreenOptions.showTooltip
              )
            )
          }
        }
      }
    })
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe()
    }
  }
}
