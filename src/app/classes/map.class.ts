import { MangolMapService } from '../services/map.service';
import {
  MangolConfigLayer,
  MangolConfigLayerGroup,
  MangolConfigLayertree
} from '../interfaces/config-layers.inteface';
import { MangolLayer } from './layer.class';
import { MangolLayergroup } from './layergroup.class';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as ol from 'openlayers';
// import Map from 'ol/map';

export class MangolMap extends ol.Map {
  private _layers: MangolLayer[];
  private _layerGroups: MangolLayergroup[];
  private _allLayers: MangolLayer[];
  public loadingTiles$ = new BehaviorSubject([]);

  constructor(options: any, private mapService: MangolMapService) {
    super(options);
    this._layers = [];
    this._layerGroups = [];
    this._allLayers = [];
  }

  addLayersAndLayerGroups(
    layertree: MangolConfigLayertree,
    parent: MangolLayergroup
  ): void {
    if (layertree.hasOwnProperty('layers')) {
      layertree.layers.forEach((layer: MangolConfigLayer) => {
        this._handleLayer(layer, parent);
      });
    }
    if (layertree.hasOwnProperty('groups')) {
      layertree.groups.forEach((group: MangolConfigLayerGroup) => {
        this._handleLayerGroup(group, parent);
      });
    }
  }

  private _handleLayer(layer: MangolConfigLayer, parent: MangolLayergroup) {
    const newLayer = new MangolLayer(this, layer, this.mapService);
    // if the parent is null then it is the root element
    if (parent === null) {
      this._layers.push(newLayer);
    } else {
      parent.nestedLayers.push(newLayer);
    }
    // add layer to the map (ol.Map function)
    this._allLayers.push(newLayer);
    this.addLayer(newLayer.getLayer());
  }

  private _handleLayerGroup(
    group: MangolConfigLayerGroup,
    parent: MangolLayergroup
  ) {
    const newLayerGroup = new MangolLayergroup(group);
    // if the parent is null then it is the root element
    if (parent === null) {
      this._layerGroups.push(newLayerGroup);
    } else {
      parent.nestedLayerGroups.push(newLayerGroup);
    }
    // recursively load subgroups and sublayers
    if (group.hasOwnProperty('children')) {
      this.addLayersAndLayerGroups(group.children, newLayerGroup);
    }
    newLayerGroup.getDetails();
  }

  getMangolLayers(): MangolLayer[] {
    return this._layers;
  }

  getMangolLayerGroups(): MangolLayergroup[] {
    return this._layerGroups;
  }

  getMangolAllLayers(): MangolLayer[] {
    return this._allLayers;
  }
}
