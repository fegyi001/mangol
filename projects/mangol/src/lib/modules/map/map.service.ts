import {
  MangolConfigLayertree,
  MangolConfigLayer,
  MangolConfigLayerGroup
} from './../../interfaces/config-layers.inteface';
import * as ol from 'openlayers';

import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  /**
   * Constructor
   * @param store
   */
  constructor(private store: Store) {}

  /**
   *
   * @param layertree MangolConfigLayertree object
   * @param map ol.Map
   */
  processLayersAndLayerGroups(layertree: MangolConfigLayertree, map: ol.Map) {
    if (layertree.hasOwnProperty('layers')) {
      this.processLayers(layertree.layers);
    }
    if (layertree.hasOwnProperty('groups')) {
      layertree.groups.forEach(g => {
        this.processLayerGroup(g);
      });
    }
  }

  /**
   *
   * @param layers
   */
  private processLayers(layers: MangolConfigLayer[]) {
    layers.forEach(l => {
      console.log(l);
    });
  }

  /**
   *
   * @param group
   */
  private processLayerGroup(group: MangolConfigLayerGroup) {}
}
