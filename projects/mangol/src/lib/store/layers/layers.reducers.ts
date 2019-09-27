import { MangolLayer } from './../../classes/Layer';
import * as LayersActions from './layers.actions';
import VectorLayer from 'ol/layer/Vector';

export interface State {
  layers: MangolLayer[];
  measureLayer: VectorLayer;
}

const initialState: State = {
  layers: [],
  measureLayer: null
};

export function layersReducer(
  state = initialState,
  action: LayersActions.LayersActions
) {
  switch (action.type) {
    case LayersActions.SET_LAYERS:
      return { ...state, layers: action.payload };
    case LayersActions.ADD_LAYER:
        return { ...state, layers: [...state.layers, action.payload]};
    case LayersActions.REMOVE_LAYER:
        return { ...state, layers: [...state.layers.filter(l => l.name === action.payload)]};
    case LayersActions.SET_MEASURE_LAYER:
      return { ...state, measureLayer: action.payload };
    default:
      return state;
  }
}
