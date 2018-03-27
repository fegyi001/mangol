import { Component, OnDestroy, OnInit } from '@angular/core';
import * as ol from 'openlayers';
import { Subscription } from 'rxjs/Subscription';

import { AppService } from './../app.service';
import { MangolConfig } from './../interfaces/config.interface';
import { MangolReady } from './../interfaces/ready.interface';

@Component({
  selector: 'mangol-demo-map-controllers',
  template: `
      <mangol [config]="config" (mapReady)="onMapReady($event)"></mangol>
      <mangol-pretty-print [code]="snippet"></mangol-pretty-print>
    `
})
export class DemoMapControllersComponent implements OnInit, OnDestroy {
  sidebarOpenedSubscription: Subscription;
  config = {} as MangolConfig;
  projection = 'EPSG:900913';
  snippet = `
  import { Component, OnInit } from '@angular/core';
  import * as ol from 'openlayers';

  import { MangolConfig } from 'mangol';

  @Component({
    selector: 'mangol-demo-map-controllers',
    template: '<mangol [config]="config"></mangol>'
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
            center: ol.proj.fromLonLat(
              [19.3956393810065, 47.168464955013],
              this.projection
            ),
            zoom: 7
          },
          layertree: {
            layers: [
              {
                name: 'OpenStreetMap layer',
                layer: new ol.layer.Tile({
                  source: new ol.source.OSM()
                })
              }
            ]
          },
          controllers: {
            mousePosition: {},
            scaleLine: {
              units: 'metric'
            },
            quickSearch: {
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
          }
        }
      };
    }
  }
`;

  constructor(private appService: AppService) {}

  public ngOnInit(): any {
    this.config = {
      map: {
        renderer: 'canvas',
        target: 'demo-map-controllers',
        view: {
          projection: this.projection,
          center: ol.proj.fromLonLat(
            [19.3956393810065, 47.168464955013],
            this.projection
          ),
          zoom: 7
        },
        layertree: {
          layers: [
            {
              name: 'OpenStreetMap layer',
              layer: new ol.layer.Tile({
                source: new ol.source.OSM()
              })
            }
          ]
        },
        controllers: {
          mousePosition: {},
          scaleLine: {
            units: 'metric'
          },
          quickSearch: {
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
