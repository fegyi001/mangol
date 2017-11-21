import { Component, OnInit } from '@angular/core';

import * as ol from 'openlayers';
import MangolConfig from '../../lib/interfaces/mangol-config.interface';

@Component({
  selector: 'mangol-demo-print',
  template: `
      <mangol [config]="config"></mangol>
    `
})
export class DemoFeatureInfoComponent implements OnInit {

  config = {} as MangolConfig;

  public ngOnInit(): any {
    this.config = {
      map: {
        renderer: 'canvas',
        target: 'demo-print',
        view: {
          projection: 'EPSG:900913',
          center: ol.proj.fromLonLat([19.3956393810065, 47.168464955013], 'EPSG:900913'),
          zoom: 7
        },
        layertree: {
          layers: [{
            name: 'OpenStreetMap layer',
            layer: new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          }, {
            name: 'Highways',
            visible: true,
            opacity: 1.0,
            queryable: true,
            layer: new ol.layer.Tile({
              source: new ol.source.TileWMS({
                url: 'http://188.166.116.137:8081/geoserver/wms',
                params: {
                  LAYERS: 'osmWsp:motorway',
                  SRS: 'EPSG:900913',
                  FORMAT: 'image/png',
                  TILED: true
                },
                serverType: 'geoserver',
                projection: 'EPSG:900913'
              })
            })
          }, {
            name: 'Country border',
            visible: true,
            opacity: 1.0,
            queryable: true,
            layer: new ol.layer.Tile({
              source: new ol.source.TileWMS({
                url: 'http://188.166.116.137:8081/geoserver/wms',
                params: {
                  LAYERS: 'osmWsp:country',
                  SRS: 'EPSG:900913',
                  FORMAT: 'image/png',
                  TILED: true
                },
                serverType: 'geoserver',
                projection: 'EPSG:900913'
              })
            })
          }]
        }
      },
      sidebar: {
        collapsible: true,
        opened: true,
        toolbar: {
          featureinfo: {
            active: true,
            disabled: false
          }
        }
      }
    };
  }

}
