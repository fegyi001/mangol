import produce from 'immer';

import { MangolLayer } from './../../classes/Layer';
import { LayersActions, LayersActionTypes } from './layers.actions';

export interface State {
  layers: MangolLayer[];
}

const initialState: State = {
  layers: []
};

export const layersReducer = produce<State, LayersActions>((draft, action) => {
  switch (action.type) {
    case LayersActionTypes.AddLayers:
      draft.layers = action.payload;
      break;
  }
}, initialState);
