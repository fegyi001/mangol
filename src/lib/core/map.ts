
import * as ol from 'openlayers';
import { MangolLayer } from './layer';
import { MangolLayergroup } from './layergroup';
import { MangolConfigLayertree, MangolConfigLayerGroup, MangolConfigLayer } from '../interfaces/mangol-config-layers.inteface';

export class MangolMap extends ol.Map {

  private _layers: MangolLayer[];
  private _layerGroups: MangolLayergroup[];

  constructor(options: any) {
    super(options);
    this._layers = [];
    this._layerGroups = [];
  }

  public addLayersAndLayerGroups(layertree: MangolConfigLayertree, parent: MangolLayergroup): void {
    // console.log(layertree);
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
    const newLayer = new MangolLayer(layer);
    // if the parent is null then it is the root element
    if (parent === null) {
      this._layers.push(newLayer);
    } else {
      parent.nestedLayers.push(newLayer);
    }
    // add layer to the map (ol.Map function)
    this.addLayer(newLayer.getLayer());
  }

  private _handleLayerGroup(group: MangolConfigLayerGroup, parent: MangolLayergroup) {
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

  public getMangolLayers(): MangolLayer[] {
    return this._layers;
  }

  public getMangolLayerGroups(): MangolLayergroup[] {
    return this._layerGroups;
  }

}
