import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import Feature from 'ol/Feature'
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'
import Polygon from 'ol/geom/Polygon'
import CircleStyle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'

import * as fromMangol from './../../../../store/mangol.reducers'

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  hoverColor: [number, number, number]

  constructor(private store: Store<fromMangol.MangolState>) {
    this.store
      .select((state) => state.featureinfo.hoverColor)
      .subscribe((color) => (this.hoverColor = color))
  }

  hoverStyle(_feature: Feature<Point | LineString | Polygon>) {
    return [
      new Style({
        fill: new Fill({
          color: this._colorWithOpacity(this.hoverColor, 0.3)
        }),
        stroke: new Stroke({
          color: this._colorWithOpacity(this.hoverColor, 0.5),
          width: 10
        }),
        image: new CircleStyle({
          fill: new Fill({
            color: this._colorWithOpacity(this.hoverColor, 0.7)
          }),
          stroke: new Stroke({
            width: 1,
            color: this._colorWithOpacity(this.hoverColor, 0.9)
          }),
          radius: 7
        })
      })
    ]
  }

  private _colorWithOpacity(
    color: number[],
    opacity: number
  ): [number, number, number, number] {
    return <[number, number, number, number]>[
      color[0],
      color[1],
      color[2],
      opacity
    ]
  }
}
