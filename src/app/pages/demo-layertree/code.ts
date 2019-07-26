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
        target: 'mangol-demo-layertree',
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
          new MangolLayerGroup({
            name: 'Overlays',
            children: [
              new MangolLayer({
                name: 'Roads',
                layer: new TileLayer({
                  source: new TileWMS({
                    url:
                      'http://188.166.116.137:8080/geoserver/gwc/service/wms',
                    crossOrigin: 'anonymous',
                    params: {
                      LAYERS: ['naturalearth:roads'],
                      format: 'image/png',
                      SRS: 'EPSG:900913'
                    }
                  }),
                  opacity: 0.5,
                  visible: false
                })
              }),
              new MangolLayerGroup({
                name: 'Coutries & Cities',
                children: [
                  new MangolLayer({
                    name: 'Country borders',
                    details:
                      'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    layer: new TileLayer({
                      source: new TileJSON({
                        url:
                          'https://api.tiles.mapbox.com/v3/mapbox.world-borders-light.json?secure',
                        crossOrigin: 'anonymous'
                      }),
                      visible: true
                    })
                  }),
                  new MangolLayer({
                    name: 'Populated places',
                    layer: new TileLayer({
                      source: new TileWMS({
                        url:
                          'http://188.166.116.137:8080/geoserver/gwc/service/wms',
                        crossOrigin: 'anonymous',
                        params: {
                          LAYERS: ['naturalearth:populated_places'],
                          format: 'image/png',
                          SRS: 'EPSG:900913'
                        }
                      }),
                      visible: false
                    })
                  })
                ]
              })
            ]
          })
        ]
      },
      sidebar: {
        collapsible: true,
        opened: true,
        title: 'Layertree example',
        mode: 'side',
        toolbar: {
          layertree: {
            active: true,
            disabled: false,
            title: 'Layers',
            details: {
              opacity: {
                sliderStep: 1,
                showLabels: true
              }
            }
          }
        }
      }
    };
  }
}
`;
