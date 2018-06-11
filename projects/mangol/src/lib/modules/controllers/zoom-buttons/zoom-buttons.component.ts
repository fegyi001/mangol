import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mangol-zoom-buttons',
  templateUrl: './zoom-buttons.component.html',
  styleUrls: ['./zoom-buttons.component.scss']
})
export class ZoomButtonsComponent implements OnInit {
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
