import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as ol from 'openlayers';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { MangolConfigLayertree } from '../../interfaces/config-layers.inteface';
import { MangolConfig } from '../../interfaces/config.interface';
import { MangolConfigMap } from './../../interfaces/config-map.interface';
import { AddMap } from './../../store/map.state';
import { MapService } from './map.service';

@Component({
  selector: 'mangol-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  target: string;

  map$: Observable<ol.Map>;
  configSubscription: Subscription;

  /**
   *
   * @param store Ngxs store
   * @param mapService
   */
  constructor(private store: Store, private mapService: MapService) {
    this.map$ = this.store.select(state => state.map.map);
  }

  ngOnInit() {
    this.target = 'my-map';
  }

  ngAfterViewInit() {
    const startMap = new ol.Map({
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
        if (config !== null && config.hasOwnProperty('map')) {
          const configMap: MangolConfigMap = config.map;
          if (configMap.hasOwnProperty('target')) {
            startMap.setTarget(configMap.target);
          }
          if (configMap.hasOwnProperty('view')) {
            startMap.setView(configMap.view);
          }
          if (configMap.hasOwnProperty('layertree')) {
            const layertree: MangolConfigLayertree = config.map.layertree;
            // remove all previously loaded layers
            startMap
              .getLayers()
              .getArray()
              .forEach(l => {
                startMap.removeLayer(l);
              });
            this.mapService.processLayersAndLayerGroups(layertree, startMap);
          }
          this.store.dispatch(new AddMap(startMap));
        } else {
          this.store.dispatch(new AddMap(startMap));
        }
      });
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }
}
