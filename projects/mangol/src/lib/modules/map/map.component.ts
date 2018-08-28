import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import Map from 'ol/Map';
import View from 'ol/View';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { MangolLayer } from '../../classes/Layer';
import { MangolLayerGroup } from '../../classes/LayerGroup';
import { MangolConfig } from '../../interfaces/config.interface';

import { MangolConfigMap } from './../../interfaces/config-map.interface';
import * as CursorActions from './../../store/cursor/cursor.actions';
import * as fromMangol from './../../store/mangol.reducers';
import { MapService } from './map.service';
import * as MapActions from './../../store/map/map.actions';
import * as LayersActions from './../../store/layers/layers.actions';

@Component({
  selector: 'mangol-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  config: MangolConfig;
  target: string;

  cursorStyle: any = null;

  configSubscription: Subscription;
  layersSubscription: Subscription;
  cursorModeSubscription: Subscription;

  defaultMap: {
    target: string;
    renderer: string;
    layers: MangolLayer[];
    view: View;
  } = null;

  /**
   *
   * @param store Ngrx store
   * @param mapService
   */
  constructor(
    private store: Store<fromMangol.MangolState>,
    private mapService: MapService
  ) {
    this.defaultMap = this.mapService.getDefaultMap();
  }

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
          new MapActions.AddMap(
            new Map({
              target: this.target,
              renderer: this.defaultMap.renderer,
              view: view !== null ? view : this.defaultMap.view,
              layers: []
            })
          )
        );
        // Register the layers
        this.store.dispatch(new LayersActions.AddLayers(layers));
      });

    // React to layer changes in the store
    this.layersSubscription = this.store
      .select(state => state.layers.layers)
      .subscribe((layers: MangolLayer[]) => {
        this.store
          .select(state => state.map.map)
          .pipe(take(1))
          .subscribe(map => {
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

    this.cursorModeSubscription = this.store
      .select(state => state.cursor.mode)
      .subscribe(cursorMode => {
        this.cursorStyle = {
          cursor:
            cursorMode !== null && cursorMode.hasOwnProperty('cursor')
              ? cursorMode.cursor
              : 'default'
        };
      });
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
    if (this.layersSubscription) {
      this.layersSubscription.unsubscribe();
    }
    if (this.cursorModeSubscription) {
      this.cursorModeSubscription.unsubscribe();
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

  onEnterOrLeaveMap(entered: boolean) {
    this.store.dispatch(new CursorActions.SetVisible(entered));
  }
}
