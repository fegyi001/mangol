import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Input
} from '@angular/core';
import { Store } from '@ngxs/store';
import * as ol from 'openlayers';
import { Subscription } from 'rxjs';

import { MangolLayer } from '../../classes/Layer';
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
  @Input() config: MangolConfig;
  target: string;

  configSubscription: Subscription;
  defaultMap: {
    target: string;
    renderer: string;
    layers: MangolLayer[];
    view: ol.View;
  } = {
    target: 'my-map',
    renderer: 'canvas',
    layers: [
      new MangolLayer({
        name: 'OpenStreetMap Layer',
        layer: new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.4057, 8.81566]),
      zoom: 4
    })
  };

  /**
   *
   * @param store Ngxs store
   * @param mapService
   */
  constructor(private store: Store, private mapService: MapService) {}

  ngOnInit() {
    this.target =
      typeof this.config !== 'undefined' &&
      this.config !== null &&
      !!this.config.map &&
      !!this.config.map.target
        ? this.config.map.target
        : this.defaultMap.target;
  }

  ngAfterViewInit() {
    this.configSubscription = this.store
      .select(state => state.config.config)
      .subscribe((config: MangolConfig) => {
        let view: ol.View = null;
        let layers: ol.layer.Layer[] = null;
        if (typeof config !== 'undefined' && config !== null && !!config.map) {
          const configMap: MangolConfigMap = config.map;
          if (!!configMap.view) {
            view = configMap.view;
          }
          layers = !!configMap.layers
            ? this.mapService.processLayersAndLayerGroups(configMap.layers)
            : this.mapService.processLayersAndLayerGroups(
                this.defaultMap.layers
              );
        } else {
          layers = this.mapService.processLayersAndLayerGroups(
            this.defaultMap.layers
          );
        }
        this.store.dispatch(
          new AddMap(
            new ol.Map({
              target: this.target,
              renderer: this.defaultMap.renderer,
              view: view !== null ? view : this.defaultMap.view,
              layers: layers
            })
          )
        );
      });
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }
}
