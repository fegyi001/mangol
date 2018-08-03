import { Component, OnDestroy, OnInit } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import TileJSON from 'ol/source/TileJSON';
import TileWMS from 'ol/source/TileWMS';
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
  selector: 'app-demo-featureinfo',
  templateUrl: './demo-featureinfo.component.html',
  styleUrls: ['./demo-featureinfo.component.scss']
})
export class DemoFeatureinfoComponent implements OnInit, OnDestroy {
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
          new MangolLayer({
            name: 'Roads',
            queryable: true,
            layer: new TileLayer({
              source: new TileWMS({
                url: 'http://188.166.116.137:8080/geoserver/gwc/service/wms',
                crossOrigin: 'anonymous',
                params: {
                  LAYERS: ['naturalearth:roads'],
                  format: 'image/png',
                  SRS: 'EPSG:900913'
                }
              }),
              opacity: 0.8,
              visible: true
            })
          }),
          new MangolLayer({
            name: 'Populated places',
            queryable: true,
            layer: new TileLayer({
              source: new TileWMS({
                url: 'http://188.166.116.137:8080/geoserver/gwc/service/wms',
                crossOrigin: 'anonymous',
                params: {
                  LAYERS: ['naturalearth:populated_places'],
                  format: 'image/png',
                  SRS: 'EPSG:900913'
                }
              }),
              visible: true,
              opacity: 0.7
            })
          })
        ]
      },
      sidebar: {
        collapsible: true,
        opened: true,
        title: 'Feature info example',
        mode: 'side',
        toolbar: {
          featureinfo: {}
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
