import { MapState, AddMap } from './../../store/map/map.actions';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import * as ol from 'openlayers';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mangol-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  target: string;

  @Select(MapState) map$: Observable<ol.Map>;

  constructor(private store: Store) {}

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
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
      })
    });

    this.store.dispatch(new AddMap(map));
  }
}
