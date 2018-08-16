import { MangolLayer } from './../../classes/Layer';
import * as LayersActions from './layers.actions';

export interface State {
  layers: MangolLayer[];
}

const initialState: State = {
  layers: []
};

export function layersReducer(
  state = initialState,
  action: LayersActions.LayersActions
) {
  switch (action.type) {
    case LayersActions.ADD_LAYERS:
      return { ...state, layers: action.payload };
    default:
      return state;
  }
}
