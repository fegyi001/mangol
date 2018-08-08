import { Observable } from 'rxjs';
import { MangolControllersZoomOptions } from './../../../interfaces/config-map-controllers.interface';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import Map from 'ol/Map';
import { MangolState } from '../../../mangol.state';

@Component({
  selector: 'mangol-zoom-buttons',
  templateUrl: './zoom-buttons.component.html',
  styleUrls: ['./zoom-buttons.component.scss']
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
