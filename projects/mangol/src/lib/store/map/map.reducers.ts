import produce from 'immer';

import Map from 'ol/Map';
import { MapActions, MapActionTypes } from './map.actions';

export interface State {
  map: Map;
}

const initialState: State = {
  map: null
};

export const mapReducer = produce<State, MapActions>((draft, action) => {
  switch (action.type) {
    case MapActionTypes.AddMap:
      draft.map = action.payload;
      break;
  }
}, initialState);
