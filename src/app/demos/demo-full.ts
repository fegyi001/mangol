import { Component, OnInit } from '@angular/core';

import * as ol from 'openlayers';
@Component({
  selector: 'mangol-demo-full',
  template: `
      <mangol-container [config]="config"></mangol-container>
    `
})
export class DemoFullComponent implements OnInit {

  config: any;

  public ngOnInit(): any {
    this.config = {
      map: {
        renderer: 'canvas',
        target: 'demo-full',
        view: {
          projection: 'EPSG:900913',
          center: ol.proj.fromLonLat([19.3956393810065, 47.168464955013], 'EPSG:900913'),
          zoom: 7
        },
        layers: [
          {
            type: 'layergroup',
            name: 'Base layers',
            expanded: false,
            visible: true,
            children: [
              {
                type: 'layer',
                name: 'OpenStreetMap layer',
                visible: true,
                opacity: 1,
                layer: new ol.layer.Tile({
                  source: new ol.source.OSM()
                })
              }
            ]
          }, {
            type: 'layergroup',
            name: 'Hungary',
            expanded: false,
            visible: true,
            children: [
              {
                type: 'layer',
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
                type: 'layer',
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
              },
              {
                type: 'layer',
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
              }
            ]
          }
        ]
      },
      sidebar: {
        collapsible: true,
        opened: true,
        toolbar: {
          layertree: {
            active: true
          },
          measure: {},
          print: {}
        }
      }
    };
  };
}
