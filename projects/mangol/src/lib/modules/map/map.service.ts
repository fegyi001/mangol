import { Injectable } from '@angular/core';
import * as ol from 'openlayers';

import { MangolLayer } from '../../classes/Layer';
import { MangolLayerGroup } from './../../classes/LayerGroup';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  /**
   * Constructor
   * @param store
   */
  constructor() {}

  /**
   * Iterates over the layers and layergroups to get the OL layer objects which can be added to the map
   * @param layers an array of MangolLayer or MangolLayerGroup objects
   */
  processLayersAndLayerGroups(
    layers: (MangolLayer | MangolLayerGroup)[]
  ): ol.layer.Layer[] {
    const myLayers: ol.layer.Layer[] = [];
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
   * @param layers the array of OL layers
   */
  private processLayer(layer: MangolLayer, layers: ol.layer.Layer[]) {
    layers.push(layer.layer);
  }

  /**
   * Processes MangolLayerGroups
   * @param group the MangolLayerGroup object to process
   * @param layers the array of OL layers
   */
  private processLayerGroup(group: MangolLayerGroup, layers: ol.layer.Layer[]) {
    group.children.forEach((c: MangolLayer | MangolLayerGroup) => {
      if (c instanceof MangolLayer) {
        this.processLayer(c, layers);
      } else if (c instanceof MangolLayerGroup) {
        this.processLayerGroup(c, layers);
      }
    });
  }
}
