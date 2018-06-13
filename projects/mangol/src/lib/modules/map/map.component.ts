import { MangolConfigMap } from './../../interfaces/config-map.interface';
import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import * as ol from 'openlayers';
import { Observable } from 'rxjs/Observable';

import { AddMap } from './../../store/map.state';
import { MangolConfigLayertree } from '../../interfaces/config-layers.inteface';
import { Subscription } from 'rxjs';
import { MangolConfig } from '../../interfaces/config.interface';

@Component({
  selector: 'mangol-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  target: string;

  map$: Observable<ol.Map>;
  configSubscription: Subscription;

  constructor(private store: Store) {
    this.map$ = this.store.select(state => state.map.map);
  }

  ngOnInit() {
    this.target = 'my-map';
  }

  ngAfterViewInit() {
    const map = new ol.Map({
      target: this.target,
      renderer: 'canvas',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        projection: 'EPSG:900913',
        center: ol.proj.fromLonLat([19.39563, 47.16846], 'EPSG:900913'),
        zoom: 8
      })
    });

    this.configSubscription = this.store
      .select(state => state.config.config)
      .subscribe((config: MangolConfig) => {
        if (config.hasOwnProperty('map')) {
          const configMap: MangolConfigMap = config.map;
          if (configMap.hasOwnProperty('target')) {
            map.setTarget(configMap.target);
          }
          if (configMap.hasOwnProperty('view')) {
            map.setView(configMap.view);
          }
          if (configMap.hasOwnProperty('layertree')) {
            // remove all previously loaded layers
            map
              .getLayers()
              .getArray()
              .forEach(l => {
                map.removeLayer(l);
              });
            const layertree: MangolConfigLayertree = config.map.layertree;
            console.log(layertree);
          }
          this.store.dispatch(new AddMap(map));
        } else {
          this.store.dispatch(new AddMap(map));
        }
      });
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }
}
