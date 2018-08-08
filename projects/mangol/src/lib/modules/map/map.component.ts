import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Store } from '@ngxs/store';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import { fromLonLat } from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { Subscription } from 'rxjs';

import { MangolLayer } from '../../classes/Layer';
import { MangolLayerGroup } from '../../classes/LayerGroup';
import { MangolConfig } from '../../interfaces/config.interface';
import { MangolState } from '../../mangol.state';
import { MangolConfigMap } from './../../interfaces/config-map.interface';
import { SetCursorVisible } from './../../store/cursor.state';
import { AddLayers } from './../../store/layers.state';
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
  layersSubscription: Subscription;

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
      projection: 'EPSG:3857',
      center: fromLonLat([19.3956393810065, 47.168464955013], 'EPSG:3857'),
      zoom: 4,
      enableRotation: true
    })
  };

  /**
   *
   * @param store Ngxs store
   * @param mapService
   */
  constructor(private store: Store, private mapService: MapService) {}

  ngOnInit() {
    // Finds the Map target if possible
    this.target =
      typeof this.config !== 'undefined' &&
      this.config !== null &&
      !!this.config.map &&
      !!this.config.map.target
        ? this.config.map.target
        : this.defaultMap.target;
  }

  ngAfterViewInit() {
    // React to config changes in the store
    this.configSubscription = this.store
      .select(state => state.config.config)
      .subscribe((config: MangolConfig) => {
        let view: View = null;
        let layers: MangolLayer[] = null;
        if (typeof config !== 'undefined' && config !== null && !!config.map) {
          const configMap: MangolConfigMap = config.map;
          if (!!configMap.view) {
            view = configMap.view;
          }
          layers = !!configMap.layers
            ? this.processLayersAndLayerGroups(configMap.layers)
            : this.processLayersAndLayerGroups(this.defaultMap.layers);
        } else {
          layers = this.processLayersAndLayerGroups(this.defaultMap.layers);
        }
        // Create the map
        this.store.dispatch(
          new AddMap(
            new Map({
              target: this.target,
              renderer: this.defaultMap.renderer,
              view: view !== null ? view : this.defaultMap.view,
              layers: []
            })
          )
        );
        // Register the layers
        this.store.dispatch(new AddLayers(layers));
      });

    // React to layer changes in the store
    this.layersSubscription = this.store
      .select(state => state.layers.layers)
      .subscribe((layers: MangolLayer[]) => {
        this.store.selectOnce(state => state.map.map).subscribe(map => {
          // Delete all previously loaded layers in the map
          map.getLayers().forEach(l => {
            map.removeLayer(l);
          });
          // Add all OL layers
          layers.forEach(l => {
            map.addLayer(l.layer);
          });
        });
      });
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
    if (this.layersSubscription) {
      this.layersSubscription.unsubscribe();
    }
  }

  /**
   * Iterates over the layers and layergroups to get the MangolLayer objects which can be added to the map
   * @param layers an array of MangolLayer or MangolLayerGroup objects
   */
  private processLayersAndLayerGroups(
    layers: (MangolLayer | MangolLayerGroup)[]
  ): MangolLayer[] {
    const myLayers: MangolLayer[] = [];
    layers.forEach(l => {
      if (l instanceof MangolLayer) {
        this.processLayer(l, myLayers);
      } else if (l instanceof MangolLayerGroup) {
        this.processLayerGroup(l, myLayers);
      }
    });
    return myLayers;
  }

  /**
   * Processes MangolLayers
   * @param layer the MangolLayer object to process
   * @param layers the array of MangolLayers
   */
  private processLayer(layer: MangolLayer, layers: MangolLayer[]) {
    layers.push(layer);
  }

  /**
   * Processes MangolLayerGroups
   * @param group the MangolLayerGroup object to process
   * @param layers the array of MangolLayers
   */
  private processLayerGroup(group: MangolLayerGroup, layers: MangolLayer[]) {
    group.children.forEach((c: MangolLayer | MangolLayerGroup) => {
      if (c instanceof MangolLayer) {
        this.processLayer(c, layers);
      } else if (c instanceof MangolLayerGroup) {
        this.processLayerGroup(c, layers);
      }
    });
  }

  getCursorStyle() {
    const cursorMode = this.store.selectSnapshot(
      (state: MangolState) => state.cursor.mode
    );
    return {
      cursor:
        cursorMode !== null && cursorMode.hasOwnProperty('cursor')
          ? cursorMode.cursor
          : 'default'
    };
  }

  onEnterOrLeaveMap(entered: boolean) {
    this.store.dispatch(new SetCursorVisible(entered));
  }
}
