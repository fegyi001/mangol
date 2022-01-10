import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import Map from 'ol/Map'
import { Observable } from 'rxjs'
import { take } from 'rxjs/operators'

import { shownStateTrigger } from '../controllers.animations'
import { MangolControllersZoomOptions } from './../../../interfaces/config-map-controllers.interface'
import * as fromMangol from './../../../store/mangol.reducers'

@Component({
  selector: 'mangol-zoom-buttons',
  templateUrl: './zoom-buttons.component.html',
  styleUrls: ['./zoom-buttons.component.scss'],
  animations: [shownStateTrigger]
})
export class ZoomButtonsComponent {
  animationDuration = 500
  zoom$: Observable<MangolControllersZoomOptions>

  constructor(private store: Store<fromMangol.MangolState>) {
    this.zoom$ = this.store.select((state) => state.controllers.zoom)
  }

  zoomIn() {
    this.store
      .select((state) => state.map.map)
      .pipe(take(1))
      .subscribe((m: Map) => {
        m.getView().animate({
          zoom: m.getView().getZoom() + 1,
          duration: this.animationDuration
        })
      })
  }

  zoomOut() {
    this.store
      .select((state) => state.map.map)
      .pipe(take(1))
      .subscribe((m: Map) => {
        m.getView().animate({
          zoom: m.getView().getZoom() - 1,
          duration: this.animationDuration
        })
      })
  }
}
