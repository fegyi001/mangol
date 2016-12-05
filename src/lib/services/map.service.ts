import { Injectable } from '@angular/core';
import { MangolMap } from '../core/_index';

@Injectable()
export class MangolMapService {
    maps: MangolMap[];

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

}
