import { Component, OnDestroy, OnInit } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import TileJSON from 'ol/source/TileJSON';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { MangolLayer } from '../../../../projects/mangol/src/lib/classes/Layer';
import { AppService } from '../../app.service';
import { MangolLayerGroup } from './../../../../projects/mangol/src/lib/classes/LayerGroup';
import { MangolConfig } from './../../../../projects/mangol/src/lib/interfaces/config.interface';
import { MangolService } from './../../../../projects/mangol/src/lib/mangol.service';
import { code } from './code';

@Component({
  selector: 'app-demo-layertree',
  templateUrl: './demo-layertree.component.html',
  styleUrls: ['./demo-layertree.component.scss']
})
export class DemoLayertreeComponent implements OnInit, OnDestroy {
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
          this.mangolService.mapState$
            .pipe(
              map(m => m.map),
              filter(m => m !== null)
            )
            .subscribe(m => {
              setTimeout(() => {
                m.updateSize();
              }, 500);
            });
        }
      }
    );
  }

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
          // new MangolLayer({
          //     name: 'MapBox Map layer',
          //     layer: new TileLayer({
          //         source: new XYZ({
          //             // tslint:disable-next-line: max-line-length
          //             url: 'https://api.mapbox.com/styles/v1/azasorin/cjyiq6x7t0ne21cmd1yrpmr56/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXphc29yaW4iLCJhIjoiY2p5aG1taTBrMDE4aTNjanh2dmxpZTNlOCJ9.a4WIatoIu-3qZDO-EjV8dQ',
          //         })
          //     }),
          // }),
          new MangolLayer({
              name: 'Giovanni Grid layer',
              layer: new TileLayer({
                  source: new TileWMS({
                      url:
                          'https://disc1.gesdisc.eosdis.nasa.gov/daac-bin/wms_ogc',
                      params: { LAYERS: 'grid45', VERSION: '1.1.1' },
                      projection: 'EPSG:4326'
                  }),
              }),
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
    const newLayer =
      new MangolLayer({
        name: 'OpenStreetMap Layer',
        details: 'Here are the OSM layer details',
        layer: new TileLayer({
          source: new OSM(),
          visible: true
          // source: new TileWMS({
          //   url: 'https://hthyyjxkdl.execute-api.us-east-1.amazonaws.com/SIT/?layer=img%3Avisualization-49d65bf2-e165-11e9-813c-7627c4ddd645%3Adata-4a441d40-e165-11e9-890f-3e95ceb867f0',
          //   // url: plot.data.uri,
          //   params: { VERSION: '1.1.1'},
          //   projection: 'EPSG:4326'
          // })
        })
      });
    const that = this;

    setTimeout(function() {
      that.mangolService.layersRemoveLayer('OpenStreetMap Layer');
    }, 1000);

    setTimeout(function() {
      that.mangolService.layersAddLayer(newLayer);
    }, 3000);

    setTimeout(function() {
      that.mangolService.layersRemoveLayer('OpenStreetMap Layer');
    }, 10000);

  }

  ngOnDestroy() {
    if (this.sidebarOpenedSubscription) {
      this.sidebarOpenedSubscription.unsubscribe();
    }
    this.mangolService.resetMangolState();
  }
}
