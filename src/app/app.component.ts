import { Component, OnInit } from '@angular/core';
import * as ol from 'openlayers';

import { MangolConfig } from '../../projects/mangol/src/lib/interfaces/config.interface';
import { MangolLayer } from './../../projects/mangol/src/lib/classes/Layer';
import { MangolLayerGroup } from './../../projects/mangol/src/lib/classes/LayerGroup';

declare var proj4: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mangolConfig: MangolConfig;

  ngOnInit() {
    proj4.defs(
      'EPSG:23700',
      '+proj=somerc +lat_0=47.14439372222222 +lon_0=19.04857177777778 +k_0=0.99993 ' +
        '+x_0=650000 +y_0=200000 +ellps=GRS67 +units=m +no_defs'
    );
    this.mangolConfig = {
      map: {
        renderer: 'canvas',
        target: 'my-map',
        view: new ol.View({
          projection: 'EPSG:900913',
          center: ol.proj.fromLonLat(
            // [19.3956393810065, 47.168464955013],
            [0, 0],
            'EPSG:900913'
          ),
          zoom: 3
        }),
        controllers: {
          mousePosition: {},
          scaleLine: {
            units: 'metric'
          },
          quickSearch: {
            placeholder: 'City search',
            items: [
              {
                text: 'Budapest',
                details: 'Capital of Hungary',
                extent: [2108491, 6010126, 2134556, 6039783]
              },
              {
                text: 'London',
                details: 'Capital of England & UK',
                coordinates: [-13664, 6711101]
              },
              {
                text: 'Paris',
                details: 'Capital of France',
                extent: [250839, 6235856, 272853, 6263067]
              }
            ]
          },
          fullScreen: {},
          tileLoad: true
        },
        layers: [
          new MangolLayer({
            name: 'OpenStreetMap Layer',
            details: 'Here are the OSM layer details',
            layer: new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          }),
          new MangolLayerGroup({
            name: 'First Layer Group',
            children: [
              new MangolLayer({
                name: 'Some layer',
                layer: new ol.layer.Tile({
                  source: new ol.source.TileJSON({
                    url:
                      'https://api.tiles.mapbox.com/v3/mapbox.20110804-hoa-foodinsecurity-3month.json?secure',
                    crossOrigin: 'anonymous'
                  }),
                  visible: false
                })
              }),
              new MangolLayerGroup({
                name: 'Second Layer Group',
                children: [
                  new MangolLayer({
                    name: 'Some other layer',
                    layer: new ol.layer.Tile({
                      source: new ol.source.TileJSON({
                        url:
                          'https://api.tiles.mapbox.com/v3/mapbox.world-borders-light.json?secure',
                        crossOrigin: 'anonymous'
                      }),
                      visible: false
                    })
                  })
                ]
              })
            ]
          })
        ],
        layertree: {}
      },
      sidebar: {
        collapsible: true,
        opened: true,
        title: 'Mangol 6.x',
        mode: 'side',
        toolbar: {
          layertree: {
            active: true,
            disabled: false,
            title: 'Layers',
            isAccordionMulti: true,
            details: {
              opacity: {
                sliderStep: 1,
                showLabels: true
              }
            }
          },
          featureinfo: {
            title: 'Feature info',
            maxFeatures: 10,
            cursorStyle: 'crosshair',
            placeholder: 'Select query layer',
            zoomOnRowClick: true,
            highlightFeatures: true,
            hoverStyle: [
              new ol.style.Style({
                fill: new ol.style.Fill({
                  color: [255, 255, 0, 0.5]
                }),
                stroke: new ol.style.Stroke({
                  color: [255, 255, 0, 1],
                  width: 5
                })
              })
            ]
          },
          measure: {
            title: 'Measure',
            disabled: false,
            fillColor: [255, 255, 0, 0.2],
            strokeColor: [33, 150, 243, 0.8],
            textColor: [33, 150, 243, 1],
            textOutlineColor: [255, 255, 255, 0.8],
            font: 'normal 14px Arial'
          },
          print: {}
        }
      }
    } as MangolConfig;
  }
}
