import { Injectable } from '@angular/core'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat } from 'ol/proj.js'
import OSM from 'ol/source/OSM'
import View from 'ol/View'

import { MangolLayer } from '../../classes/Layer'

@Injectable({
  providedIn: 'root'
})
export class MapService {
  getDefaultMap(): {
    target: string
    layers: MangolLayer[]
    view: View
  } {
    return {
      target: 'my-map',
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
    }
  }
}
