import { Component, OnDestroy, OnInit } from '@angular/core';
import * as ol from 'openlayers';
import { Subscription } from 'rxjs/Subscription';

import { AppService } from '../app.service';
import { MangolConfig } from './../interfaces/config.interface';
import { MangolReady } from './../interfaces/ready.interface';

declare var proj4: any;

@Component({
  selector: 'mangol-demo-layertree',
  template: `
      <mangol [config]="config" (mapReady)="onMapReady($event)"></mangol>
      <mangol-pretty-print [code]="snippet"></mangol-pretty-print>
    `
})
export class DemoLayertreeComponent implements OnInit, OnDestroy {
  sidebarOpenedSubscription: Subscription;
  config = {} as MangolConfig;
  snippet = `
  import { Component, OnInit } from '@angular/core';
  import * as ol from 'openlayers';

  import { MangolConfig } from 'mangol';

  declare var proj4: any;

  @Component({
    selector: 'mangol-demo-layertree',
    template: '<mangol [config]="config"></mangol>'
  })
  export class DemoLayertreeComponent implements OnInit {
    config = {} as MangolConfig;

    ngOnInit() {
      proj4.defs(
        'EPSG:23700', '+proj=somerc +lat_0=47.14439372222222 +lon_0=19.04857177777778 +k_0=0.99993'
          + '+x_0=650000 +y_0=200000 +ellps=GRS67 +units=m +no_defs'
      );

      this.config = {
        map: {
          renderer: 'canvas',
          target: 'demo-layertree',
          view: {
            projection: 'EPSG:900913',
            center: ol.proj.fromLonLat(
              [19.3956393810065, 47.168464955013],
              'EPSG:900913'
            ),
            zoom: 7
          },
          layertree: {
            layers: [
              {
                name: 'OpenStreetMap layer',
                description: 'A sample description',
                visible: true,
                opacity: 1,
                layer: new ol.layer.Tile({
                  source: new ol.source.OSM()
                })
              }
            ],
            groups: [
              {
                name: 'Hungary',
                children: {
                  layers: [
                    {
                      name: 'Main roads',
                      visible: false,
                      opacity: 1.0,
                      layer: new ol.layer.Tile({
                        source: new ol.source.TileWMS({
                          url: 'http://188.166.116.137:8080/geoserver/wms',
                          params: {
                            LAYERS: 'osmWsp:trunk_primary',
                            SRS: 'EPSG:23700',
                            FORMAT: 'image/png',
                            TILED: true
                          },
                          projection: 'EPSG:23700'
                        })
                      })
                    },
                    {
                      name: 'Highways',
                      visible: false,
                      opacity: 1.0,
                      layer: new ol.layer.Tile({
                        source: new ol.source.TileWMS({
                          url: 'http://188.166.116.137:8080/geoserver/wms',
                          params: {
                            LAYERS: 'osmWsp:motorway',
                            SRS: 'EPSG:23700',
                            FORMAT: 'image/png',
                            TILED: true
                          },
                          projection: 'EPSG:23700'
                        })
                      })
                    },
                    {
                      name: 'Country border',
                      visible: false,
                      opacity: 1.0,
                      layer: new ol.layer.Tile({
                        source: new ol.source.TileWMS({
                          url: 'http://188.166.116.137:8080/geoserver/wms',
                          params: {
                            LAYERS: 'osmWsp:country',
                            SRS: 'EPSG:23700',
                            FORMAT: 'image/png',
                            TILED: true
                          },
                          projection: 'EPSG:23700'
                        })
                      })
                    }
                  ]
                }
              }
            ]
          }
        },
        sidebar: {
          collapsible: true,
          opened: true,
          toolbar: {
            // Minimal configuration
            layertree: {}
          }
        }
      };
    }
  }

  `;

  constructor(private appService: AppService) {}

  ngOnInit() {
    proj4.defs(
      'EPSG:23700',
      `+proj=somerc +lat_0=47.14439372222222 +lon_0=19.04857177777778 +k_0=0.99993 +x_0=650000 +y_0=200000 +ellps=GRS67 +units=m +no_defs`
    );

    this.config = {
      map: {
        renderer: 'canvas',
        target: 'demo-layertree',
        view: {
          projection: 'EPSG:900913',
          center: ol.proj.fromLonLat(
            [19.3956393810065, 47.168464955013],
            'EPSG:900913'
          ),
          zoom: 7
        },
        layertree: {
          layers: [
            {
              name: 'OpenStreetMap layer',
              description: 'A sample description',
              visible: true,
              opacity: 1,
              layer: new ol.layer.Tile({
                source: new ol.source.OSM()
              })
            }
          ],
          groups: [
            {
              name: 'Hungary',
              children: {
                layers: [
                  {
                    name: 'Main roads',
                    visible: false,
                    opacity: 1.0,
                    layer: new ol.layer.Tile({
                      source: new ol.source.TileWMS({
                        url: 'http://188.166.116.137:8080/geoserver/wms',
                        params: {
                          LAYERS: 'osmWsp:trunk_primary',
                          SRS: 'EPSG:23700',
                          FORMAT: 'image/png',
                          TILED: true
                        },
                        projection: 'EPSG:23700'
                      })
                    })
                  },
                  {
                    name: 'Highways',
                    visible: false,
                    opacity: 1.0,
                    layer: new ol.layer.Tile({
                      source: new ol.source.TileWMS({
                        url: 'http://188.166.116.137:8080/geoserver/wms',
                        params: {
                          LAYERS: 'osmWsp:motorway',
                          SRS: 'EPSG:23700',
                          FORMAT: 'image/png',
                          TILED: true
                        },
                        projection: 'EPSG:23700'
                      })
                    })
                  },
                  {
                    name: 'Country border',
                    visible: false,
                    opacity: 1.0,
                    layer: new ol.layer.Tile({
                      source: new ol.source.TileWMS({
                        url: 'http://188.166.116.137:8080/geoserver/wms',
                        params: {
                          LAYERS: 'osmWsp:country',
                          SRS: 'EPSG:23700',
                          FORMAT: 'image/png',
                          TILED: true
                        },
                        projection: 'EPSG:23700'
                      })
                    })
                  }
                ]
              }
            }
          ]
        }
      },
      sidebar: {
        collapsible: true,
        opened: true,
        toolbar: {
          // Minimal configuration
          layertree: {}
        }
      }
    };
  }

  ngOnDestroy() {
    if (this.sidebarOpenedSubscription) {
      this.sidebarOpenedSubscription.unsubscribe();
    }
  }

  onMapReady(evt: MangolReady) {
    this.sidebarOpenedSubscription = this.appService.sidebarOpenedSubject.subscribe(
      opened => {
        if (opened !== null) {
          const map = evt.mapService.getMaps()[0];
          setTimeout(() => {
            map.updateSize();
          }, 500);
        }
      }
    );
  }
}
