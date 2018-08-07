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
    const feature = new Feature({
      geometry: new Point([0, 0])
    });
    feature.setProperties({ aaa: 'bbb' });
    this.mangolConfig = {
      map: {
        renderer: 'canvas',
        target: 'my-map',
        view: new View({
          projection: 'EPSG:900913',
          center: fromLonLat([0, 0], 'EPSG:900913'),
          zoom: 3
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
            name: 'States & Provinces',
            queryable: true,
            querySrs: 'EPSG:4326',
            queryIdProperty: 'name_id',
            layer: new TileLayer({
              source: new TileWMS({
                url: 'http://188.166.116.137:8080/geoserver/gwc/service/wms',
                crossOrigin: 'anonymous',
                params: {
                  LAYERS: ['naturalearth:states_provinces'],
                  format: 'image/png',
                  SRS: 'EPSG:900913'
                }
              }),
              opacity: 0.8,
              visible: true
            })
          }),
          new MangolLayer({
            name: 'Countries',
            queryable: true,
            querySrs: 'EPSG:4326',
            queryIdProperty: 'NAME',
            queryColumns: [
              'NAME',
              'FORMAL_EN',
              'CONTINENT',
              'SUBREGION',
              'POP_EST'
            ],
            layer: new TileLayer({
              source: new TileWMS({
                url: 'http://188.166.116.137:8080/geoserver/gwc/service/wms',
                crossOrigin: 'anonymous',
                params: {
                  LAYERS: ['naturalearth:countries'],
                  format: 'image/png',
                  SRS: 'EPSG:900913'
                }
              }),
              opacity: 0.8,
              visible: true
            })
          }),
          new MangolLayer({
            name: 'Roads',
            queryable: true,
            querySrs: 'EPSG:4326',
            layer: new TileLayer({
              source: new TileWMS({
                url: 'http://188.166.116.137:8080/geoserver/gwc/service/wms',
                crossOrigin: 'anonymous',
                params: {
                  LAYERS: ['naturalearth:roads'],
                  format: 'image/png',
                  SRS: 'EPSG:900913'
                }
              }),
              opacity: 0.8,
              visible: true
            })
          }),
          new MangolLayer({
            name: 'Populated places',
            queryable: true,
            queryIdProperty: 'NAME',
            querySrs: 'EPSG:4326',
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
              visible: true,
              opacity: 0.8
            })
          }),
          new MangolLayer({
            name: 'Vector layer',
            queryable: true,
            layer: new VectorLayer({
              source: new VectorSource({
                features: [feature]
              })
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
    } as MangolConfig;
  }
}
`;
