import { Component, OnInit } from '@angular/core';
import * as ol from 'openlayers';
import { MangolConfig } from '../../projects/mangol/src/lib/interfaces/config.interface';

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
        target: 'demo-full',
        view: {
          projection: 'EPSG:900913',
          center: ol.proj.fromLonLat(
            [19.3956393810065, 47.168464955013],
            'EPSG:900913'
          ),
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
        layertree: {
          groups: [
            {
              name: 'Base layers',
              description: 'Customizable layergroup description',
              children: {
                layers: [
                  {
                    name: 'OpenStreetMap layer',
                    description: 'Awesome free streetmap',
                    visible: true,
                    opacity: 1,
                    layer: new ol.layer.Tile({
                      source: new ol.source.OSM()
                    })
                  }
                ],
                groups: []
              }
            },
            {
              name: 'Overlays',
              children: {
                layers: [
                  {
                    name: 'Main roads',
                    description: 'Hungary',
                    visible: false,
                    opacity: 1.0,
                    queryable: true,
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
                    description: 'Hungary',
                    visible: true,
                    opacity: 1.0,
                    queryable: true,
                    attrColumns: [
                      {
                        name: 'osm_id',
                        label: 'OpenStreetMap ID'
                      },
                      {
                        name: 'name',
                        label: 'Name'
                      }
                    ],
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
                    description: 'Hungary',
                    visible: true,
                    opacity: 1.0,
                    queryable: true,
                    layer: new ol.layer.Image({
                      source: new ol.source.ImageWMS({
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
                ],
                groups: []
              }
            }
          ]
        }
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
            title: 'Measure on Map',
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
