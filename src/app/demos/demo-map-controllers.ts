import { MangolMapService } from './../../lib/services/map.service';
import { MangolMap } from './../../lib/core/map';
import { Component, OnInit } from '@angular/core';

import * as ol from 'openlayers';
import { MangolConfig } from '../../lib/interfaces/mangol-config.interface';

@Component({
  selector: 'mangol-demo-map-controllers',
  template: `
      <mangol [config]="config"></mangol>
    `
})
export class DemoMapControllersComponent implements OnInit {
  config = {} as MangolConfig;
  projection = 'EPSG:900913';

  public ngOnInit(): any {
    this.config = {
      map: {
        renderer: 'canvas',
        target: 'demo-map-controllers',
        view: {
          projection: this.projection,
          center: ol.proj.fromLonLat([19.3956393810065, 47.168464955013], this.projection),
          zoom: 7
        },
        layertree: {
          layers: [{
            name: 'OpenStreetMap layer',
            layer: new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          }]
        },
        controllers: {
          mousePosition: {},
          scaleLine: {
            units: 'metric'
          },
          quickSearch: {
            items: [ {
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
        }
      }
    };
  }
}
