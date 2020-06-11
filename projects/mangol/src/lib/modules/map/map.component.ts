import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import Map from 'ol/Map';
import { addCommon as addCommonProjections } from 'ol/proj.js';
import { register } from 'ol/proj/proj4.js';
import View from 'ol/View';
import proj4 from 'proj4';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { MangolLayer } from '../../classes/Layer';
import { MangolLayerGroup } from '../../classes/LayerGroup';
import { MangolConfig } from '../../interfaces/config.interface';
import { MangolConfigMap } from './../../interfaces/config-map.interface';
import * as ControllersActions from './../../store/controllers/controllers.actions';
import { MangolControllersPositionStateModel } from './../../store/controllers/controllers.reducers';
import * as CursorActions from './../../store/cursor/cursor.actions';
import * as LayersActions from './../../store/layers/layers.actions';
import * as fromMangol from './../../store/mangol.reducers';
import * as MapActions from './../../store/map/map.actions';
import { MapService } from './map.service';

@Component({
  selector: 'mangol-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  config: MangolConfig;
  target: string;

  cursorStyle: any = null;

  configSubscription: Subscription;
  layersSubscription: Subscription;
  cursorModeSubscription: Subscription;
  mapSubscription: Subscription;
  positionSubscription: Subscription;

  pointerMoveFunction: any = null;
  position: MangolControllersPositionStateModel = null;

  defaultMap: {
    target: string;
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
    addCommonProjections();
    register(proj4);
    // React to config changes in the store
    this.configSubscription = this.store
      .select((state) => state.config.config)
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
          new MapActions.SetMap(
            new Map({
              target: this.target,
              view: view !== null ? view : this.defaultMap.view,
              layers: [],
            })
          )
        );
        // Register the layers
        this.store.dispatch(new LayersActions.SetLayers(layers));
      });

    // React to layer changes in the store
    this.layersSubscription = this.store
      .select((state) => state.layers.layers)
      .subscribe((layers: MangolLayer[]) => {
        this.store
          .select((state) => state.map.map)
          .pipe(take(1))
          .subscribe((map) => {
            // Delete all previously loaded layers in the map
            map.getLayers().forEach((l) => {
              map.removeLayer(l);
            });
            // Add all OL layers
            layers.forEach((l) => {
              map.addLayer(l.layer);
            });
          });
      });

    this.cursorModeSubscription = this.store
      .select((state) => state.cursor.mode)
      .subscribe((cursorMode) => {
        this.cursorStyle = {
          cursor:
            cursorMode !== null && cursorMode.hasOwnProperty('cursor')
              ? cursorMode.cursor
              : 'default',
        };
      });

    this.mapSubscription = this.store
      .select((state) => state.map.map)
      .pipe(filter((m) => m !== null))
      .subscribe((m) => {
        if (this.pointerMoveFunction !== null) {
          m.un('pointermove', this.pointerMoveFunction);
        }
        this.pointerMoveFunction = (evt: any) =>
          this._createPointerMoveFunction(evt);
        m.on('pointermove', this.pointerMoveFunction);
      });

    this.positionSubscription = this.store
      .select((state) => state.controllers.position)
      .subscribe((position) => (this.position = position));
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
    if (this.mapSubscription) {
      this.mapSubscription.unsubscribe();
    }
    if (this.pointerMoveFunction !== null) {
      this.store
        .select((state) => state.map.map)
        .pipe(
          filter((m) => m !== null),
          take(1)
        )
        .subscribe((m) => {
          m.un('pointermove', this.pointerMoveFunction);
        });
    }
  }

  /**
   * Creates the pointermove event handler function
   * @param evt
   */
  private _createPointerMoveFunction(evt: any) {
    if (evt.dragging) {
      return;
    } else {
      const coords = <[number, number]>this._formatCoordinates(evt.coordinate);
      this.store.dispatch(
        new ControllersActions.SetPositionCoordinates(coords)
      );
    }
  }

  /**
   * Formats a pair of coordinates bz a given precision
   * @param coords
   */
  private _formatCoordinates(coords: any[]): number[] {
    const formattedCoords: number[] = [];
    coords.forEach((coord: any) => {
      coord = parseFloat(coord).toFixed(this.position.precision);
      formattedCoords.push(coord);
    });
    return formattedCoords;
  }

  /**
   * Iterates over the layers and layergroups to get the MangolLayer objects which can be added to the map
   * @param layers an array of MangolLayer or MangolLayerGroup objects
   */
  private processLayersAndLayerGroups(
    layers: (MangolLayer | MangolLayerGroup)[]
  ): MangolLayer[] {
    const myLayers: MangolLayer[] = [];
    layers.forEach((l) => {
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
