import { Action } from '@ngrx/store'
import Circle from 'ol/geom/Circle'
import LineString from 'ol/geom/LineString'
import Polygon from 'ol/geom/Polygon'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

import { MangolLayer } from './../../classes/Layer'

export const SET_LAYERS = '[Layers] Set Layers'
export const SET_MEASURE_LAYER = '[Layers] Set Measure Layer'

export class SetLayers implements Action {
  readonly type = SET_LAYERS
  constructor(public payload: MangolLayer[]) {}
}
export class SetMeasureLayer implements Action {
  readonly type = SET_MEASURE_LAYER
  constructor(
    public payload: VectorLayer<VectorSource<LineString | Polygon | Circle>>
  ) {}
}

export type LayersActions = SetLayers | SetMeasureLayer
