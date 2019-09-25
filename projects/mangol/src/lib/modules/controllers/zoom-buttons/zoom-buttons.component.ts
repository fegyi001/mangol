import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromMangol from './../../../store/mangol.reducers';
import Map from 'ol/Map';
import { Observable } from 'rxjs';

import { shownStateTrigger } from '../controllers.animations';
import { MangolControllersZoomOptions } from './../../../interfaces/config-map-controllers.interface';

@Component({
  selector: 'mangol-zoom-buttons',
  templateUrl: './zoom-buttons.component.html',
  styleUrls: ['./zoom-buttons.component.scss'],
  animations: [shownStateTrigger]
})
export class ZoomButtonsComponent implements OnInit {
  animationDuration = 500;
  zoom$: Observable<MangolControllersZoomOptions>;

  constructor(private store: Store<fromMangol.MangolState>) {
    this.zoom$ = this.store.select(fromMangol.getControllersZoom);
  }

  ngOnInit() {}

  zoomIn() {
    this.store
      .select(fromMangol.getMap)
      .pipe(take(1))
      .subscribe((m: Map) => {
        m.getView().animate({
          zoom: m.getView().getZoom() + 1,
          duration: this.animationDuration
        });
      });
  }

  zoomOut() {
    this.store
      .select(fromMangol.getMap)
      .pipe(take(1))
      .subscribe((m: Map) => {
        m.getView().animate({
          zoom: m.getView().getZoom() - 1,
          duration: this.animationDuration
        });
      });
  }
}
