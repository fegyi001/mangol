import { Component, OnDestroy, OnInit } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import TileJSON from 'ol/source/TileJSON';
import View from 'ol/View';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MangolLayer } from '../../../../projects/mangol/src/lib/classes/Layer';
import { AppService } from '../../app.service';
import { MangolLayerGroup } from './../../../../projects/mangol/src/lib/classes/LayerGroup';
import { MangolConfig } from './../../../../projects/mangol/src/lib/interfaces/config.interface';
import { MangolService } from './../../../../projects/mangol/src/lib/mangol.service';
import { code } from './code';

@Component({
  selector: 'app-demo-full',
  templateUrl: './demo-full.component.html',
  styleUrls: ['./demo-full.component.scss']
})
export class DemoFullComponent implements OnInit, OnDestroy {
  mangolConfig: MangolConfig;
  sidebarOpenedSubscription: Subscription;

  code = code;

  constructor(
    private appService: AppService,
    private mangolService: MangolService
  ) {
    this.sidebarOpenedSubscription = this.appService.sidebarOpenedSubject.subscribe(
      opened => {
        if (opened !== null) {
          this.mangolService
            .getMap$()
            .pipe(filter(map => map !== null))
            .subscribe(map => {
              setTimeout(() => {
                map.updateSize();
              }, 500);
            });
        }
      }
    );
  }

  ngOnInit() {
    this.mangolConfig = {
      map: {
        renderer: 'canvas',
        target: 'my-map',
        view: new View({
          projection: 'EPSG:900913',
          center: fromLonLat([0, 0], 'EPSG:900913'),
          zoom: 3
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
                name: 'Food Insecurity Layer',
                layer: new TileLayer({
                  source: new TileJSON({
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
                    name: 'Countries',
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
                    name: 'Food Insecurity Layer2',
                    layer: new TileLayer({
                      source: new TileJSON({
                        url:
                          'https://api.tiles.mapbox.com/v3/mapbox.20110804-hoa-foodinsecurity-3month.json?secure',
                        crossOrigin: 'anonymous'
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
        title: 'Mangol 6.x',
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
          },
          featureinfo: {
            title: 'Feature info'
          },
          measure: {},
          print: {}
        }
      }
    } as MangolConfig;
  }

  ngOnDestroy() {
    if (this.sidebarOpenedSubscription) {
      this.sidebarOpenedSubscription.unsubscribe();
    }
  }
}
