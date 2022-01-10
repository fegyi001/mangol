import Circle from 'ol/geom/Circle'
import LineString from 'ol/geom/LineString'
import Polygon from 'ol/geom/Polygon'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

import { MangolLayer } from '../../classes/Layer'
import * as LayersActions from './layers.actions'

export interface State {
  layers: MangolLayer[]
  measureLayer: VectorLayer<VectorSource<LineString | Polygon | Circle>>
}

const initialState: State = {
  layers: [],
  measureLayer: null
}

export function layersReducer(
  state = initialState,
  action: LayersActions.LayersActions
) {
  switch (action.type) {
    case LayersActions.SET_LAYERS:
      return { ...state, layers: action.payload }
    case LayersActions.SET_MEASURE_LAYER:
      return { ...state, measureLayer: action.payload }
    default:
      return state
  }
}
