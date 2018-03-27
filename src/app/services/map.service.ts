import { Injectable } from '@angular/core';
import { MangolMap } from '../classes/map.class';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as ol from 'openlayers';

@Injectable()
export class MangolMapService {
  maps: MangolMap[];
  loadingTiles = new BehaviorSubject([]);

  constructor() {
    this.maps = [];
  }

  /**
   * Retrieves all the maps
   */
  getMaps(): MangolMap[] {
    return this.maps;
  }

  /**
   * Returns a map object from the maps array
   */
  getMapById(id: string): MangolMap {
    let map: MangolMap = null;
    for (let i = 0; i < this.maps.length; i++) {
      if (this.maps[i].getTarget() === id) {
        map = this.maps[i];
        break;
      }
    }
    return map;
  }

  /**
   * Adds a new map to the maps array
   */
  addMap(map: MangolMap): void {
    this.maps.push(map);
  }

  addTile(tile: string) {
    const loads = [...this.loadingTiles.getValue()];
    loads.push(tile);
    this.loadingTiles.next(loads);
  }

  removeTile(tile: string) {
    const loads = [...this.loadingTiles.getValue()];
    loads.splice(loads.indexOf(tile), 1);
    this.loadingTiles.next(loads);
  }
}
