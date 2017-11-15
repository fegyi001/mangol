import { MangolMapService } from './../../lib/services/map.service';
import { Component, OnInit } from '@angular/core';

import * as ol from 'openlayers';
import { MangolConfig } from '../../lib/interfaces/mangol-config.interface';
import { MangolReady } from '../../lib/interfaces/mangol-ready.interface';

@Component({
  selector: 'mangol-demo-full',
  template: `
      <mangol [config]="config" (mapReady)="onMapReady($event)"></mangol>
    `
})
export class DemoFullComponent implements OnInit {

  config = {} as MangolConfig;

  mapService: MangolMapService;

  public ngOnInit() {
    this.config = {
      map: {
        renderer: 'canvas',
        target: 'demo-full',
        view: {
          projection: 'EPSG:900913',
          center: ol.proj.fromLonLat([19.3956393810065, 47.168464955013], 'EPSG:900913'),
          zoom: 7,
          zoomDuration: 500
        },
        controllers: {
          mousePosition: {},
          scaleLine: {
            units: 'metric'
          },
          quickSearch: {
            placeholder: 'City search',
            items: [{
              text: 'Budapest',
              details: 'Capital of Hungary',
              extent: [2108491, 6010126, 2134556, 6039783]
            }, {
              text: 'London',
              details: 'Capital of England & UK',
              coordinates: [-13664, 6711101]
            }, {
              text: 'Paris',
              details: 'Capital of France',
              extent: [250839, 6235856, 272853, 6263067]
            }]
          },
          fullScreen: {}
        },
        layertree: {
          groups: [{
            name: 'Base layers',
            description: 'Customizable layergroup description',
            children: {
              layers: [{
                name: 'OpenStreetMap layer',
                description: 'Awesome free streetmap',
                visible: true,
                opacity: 1,
                layer: new ol.layer.Tile({
                  source: new ol.source.OSM()
                })
              }],
              groups: []
            }
          }, {
            name: 'Overlays',
            children: {
              layers: [{
                name: 'Main roads',
                description: 'Hungary',
                visible: false,
                opacity: 1.0,
                queryable: true,
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
                description: 'Hungary',
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
              },
              {
                name: 'Country border',
                description: 'Hungary',
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
              }],
              groups: []
            }
          }]
        },
      },
      sidebar: {
        collapsible: true,
        opened: true,
        mode: 'side',
        toolbar: {
          layertree: {
            active: true,
            disabled: false,
            fontSet: 'ms',
            fontIcon: 'ms-layers',
            title: 'My Awesome Layers',
            isAccordionMulti: true,
            details: {
              opacity: {
                sliderStep: 1,
                showLabels: true
              }
            }
          },
          featureinfo: {},
          measure: {},
          print: {}
        }
      }
    };
  }

  onMapReady($event: MangolReady) {
    this.mapService = $event.mapService;
    console.log('Mangol is ready. Here is your MangolReady event:')
    console.log($event);
  }
}
