import { Component, OnInit } from '@angular/core';

import * as ol from 'openlayers';
import { MangolConfig } from '../../lib/interfaces/mangol-config.interface';

@Component({
  selector: 'mangol-demo-layertree',
  template: `
      <mangol [config]="config"></mangol>
    `
})
export class DemoLayertreeComponent implements OnInit {

  config = {} as MangolConfig;

  public ngOnInit(): any {
    this.config = {
      map: {
        renderer: 'canvas',
        target: 'demo-layertree',
        view: {
          projection: 'EPSG:900913',
          center: ol.proj.fromLonLat([19.3956393810065, 47.168464955013], 'EPSG:900913'),
          zoom: 7
        },
        layertree: {
          layers: [{
            name: 'OpenStreetMap layer',
            description: 'A sample description',
            visible: true,
            opacity: 1,
            layer: new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          }],
          groups: [{
            name: 'Hungary',
            children: {
              layers: [{
                name: 'Main roads',
                visible: false,
                opacity: 1.0,
                layer: new ol.layer.Tile({
                  source: new ol.source.TileWMS({
                    url: 'http://188.166.116.137:8081/geoserver/wms',
                    params: {
                      LAYERS: 'osmWsp:trunk_primary',
                      SRS: 'EPSG:900913',
                      FORMAT: 'image/png',
                      TILED: true
                    },
                    serverType: 'geoserver',
                    projection: 'EPSG:900913'
                  })
                })
              }, {
                name: 'Highways',
                visible: false,
                opacity: 1.0,
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
                visible: false,
                opacity: 1.0,
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
          }]
        }
      },
      sidebar: {
        collapsible: true,
        opened: true,
        toolbar: {
          layertree: {}
        }
      }
    };
  };
}
