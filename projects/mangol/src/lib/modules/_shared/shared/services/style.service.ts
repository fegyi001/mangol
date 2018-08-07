import { MangolState } from './../../../../mangol.state';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import Feature from 'ol/Feature';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import Icon from 'ol/style/Icon';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  constructor(private store: Store) {}

  hoverStyle(feature: Feature) {
    const hoverColor = this.store.selectSnapshot(
      (state: MangolState) => state.featureinfo.hoverColor
    );
    return [
      new Style({
        fill: new Fill({
          color: this._colorWithOpacity(hoverColor, 0.3)
        }),
        stroke: new Stroke({
          color: this._colorWithOpacity(hoverColor, 0.5),
          width: 10
        }),
        image: new CircleStyle({
          fill: new Fill({
            color: this._colorWithOpacity(hoverColor, 0.7)
          }),
          stroke: new Stroke({
            width: 1,
            color: this._colorWithOpacity(hoverColor, 0.9)
          }),
          radius: 7
        })
      })
    ];
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
    ];
  }
}
