import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import Map from 'ol/Map';
import { Observable } from 'rxjs';

import { MangolState } from '../../../mangol.state';
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

  constructor(private store: Store) {
    this.zoom$ = this.store.select(
      (state: MangolState) => state.controllers.zoom
    );
  }

  ngOnInit() {}

  zoomIn() {
    this.store.selectOnce(state => state.map.map).subscribe((m: Map) => {
      m.getView().animate({
        zoom: m.getView().getZoom() + 1,
        duration: this.animationDuration
      });
    });
  }

  zoomOut() {
    this.store.selectOnce(state => state.map.map).subscribe((m: Map) => {
      m.getView().animate({
        zoom: m.getView().getZoom() - 1,
        duration: this.animationDuration
      });
    });
  }
}
