export const code = `
import { Component, OnInit } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import TileJSON from 'ol/source/TileJSON';
import View from 'ol/View';

import { MangolLayer, MangolLayerGroup, MangolConfig } from 'mangol';

@Component({
  selector: 'app-demo-layertree',
  template: '<mangol [config]="mangolConfig"></mangol>',
  styles: []
})
export class DemoLayertreeComponent implements OnInit {
  mangolConfig: MangolConfig;

  constructor() {}

  ngOnInit() {
    this.mangolConfig = {
      map: {
        target: 'mangol-demo-featureinfo',
        view: new View({
          projection: 'EPSG:900913',
          center: fromLonLat(
            [19.3956393810065, 47.168464955013],
            'EPSG:900913'
          ),
          zoom: 4
        }),
        layers: [
          new MangolLayer({
            name: 'OpenStreetMap Layer',
            details: 'Here are the OSM layer details',
            layer: new TileLayer({
              source: new OSM(),
              visible: true
            })
          }),
          new MangolLayer({
            name: 'Countries (Vector)',
            queryable: true,
            queryIdProperty: 'name',
            layer: new VectorLayer({
              source: new VectorSource({
                url: 'assets/geojson/countries.geojson',
                format: new pseudoGeoJSONFormat({
                  dataProjection: 'EPSG:4326',
                  featureProjection: 'EPSG:900913'
                })
              })
            })
          }),
          new MangolLayer({
            name: 'Cities (WMS)',
            queryable: true,
            querySrs: 'EPSG:900913',
            queryIdProperty: 'NAME',
            queryColumns: [
              'NAME',
              'ADM0NAME',
              'POP_MIN',
              'POP_MAX',
              'TIMEZONE',
              'FEATURECLA'
            ],
            layer: new TileLayer({
              source: new TileWMS({
                url: 'http://188.166.116.137:8080/geoserver/gwc/service/wms',
                crossOrigin: 'anonymous',
                params: {
                  LAYERS: ['naturalearth:populated_places'],
                  format: 'image/png',
                  SRS: 'EPSG:900913'
                }
              }),
              visible: true
            })
          })
        ]
      },
      sidebar: {
        collapsible: true,
        opened: true,
        title: 'Feature info example',
        mode: 'side',
        toolbar: {
          featureinfo: {}
        }
      }
    };
  }
}
`;
