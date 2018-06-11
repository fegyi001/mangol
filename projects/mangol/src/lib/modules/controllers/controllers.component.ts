import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import * as ol from 'openlayers';

@Component({
  selector: 'mangol-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.scss']
})
export class ControllersComponent implements OnInit {
  animationDuration = 500;
  constructor(private store: Store) {}

  ngOnInit() {}

  zoomIn() {
    this.store.selectOnce(state => state.map.map).subscribe((m: ol.Map) => {
      m.getView().animate({
        zoom: m.getView().getZoom() + 1,
        duration: this.animationDuration
      });
    });
  }

  zoomOut() {
    this.store.selectOnce(state => state.map.map).subscribe((m: ol.Map) => {
      m.getView().animate({
        zoom: m.getView().getZoom() - 1,
        duration: this.animationDuration
      });
    });
  }
}
