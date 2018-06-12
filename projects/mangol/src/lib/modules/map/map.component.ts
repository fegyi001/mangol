import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as ol from 'openlayers';
import { Observable } from 'rxjs/Observable';

import { AddMap } from './../../store/map.actions';

@Component({
  selector: 'mangol-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  target: string;

  map$: Observable<ol.Map>;

  constructor(private store: Store) {
    this.map$ = this.store.select(state => state.map.map);
  }

  ngOnInit() {
    this.target = 'my-map';
  }

  ngAfterViewInit() {
    const map = new ol.Map({
      target: this.target,
      renderer: 'canvas',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        projection: 'EPSG:900913',
        center: ol.proj.fromLonLat([19.39563, 47.16846], 'EPSG:900913'),
        zoom: 8
      })
    });

    this.store.dispatch(new AddMap(map));
  }
}
