import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as ol from 'openlayers';

@Component({
  selector: 'mangol-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  target: string;
  map: ol.Map;
  constructor() {}

  ngOnInit() {
    this.target = 'my-map';
  }

  ngAfterViewInit() {
    this.map = new ol.Map({
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
  }
}
