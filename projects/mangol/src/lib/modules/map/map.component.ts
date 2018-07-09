import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Store } from '@ngxs/store';
import Layer from 'ol/layer/Layer';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import { fromLonLat } from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
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
    view: View;
  } = {
    target: 'my-map',
    renderer: 'canvas',
    layers: [
      new MangolLayer({
        name: 'OpenStreetMap Layer',
        layer: new TileLayer({
          source: new OSM()
        })
      })
    ],
    view: new View({
      center: fromLonLat([37.4057, 8.81566]),
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
        let view: View = null;
        let layers: Layer[] = null;
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
            new Map({
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
