import produce from 'immer';

import { MangolConfig } from '../../interfaces/config.interface';
import { ConfigActions, ConfigActionTypes } from './config.actions';

export interface State {
  config: MangolConfig;
}

const initialState: State = {
  config: null
};

export const configReducer = produce<State, ConfigActions>((draft, action) => {
  switch (action.type) {
    case ConfigActionTypes.SetConfig:
      draft.config = action.payload;
      break;
  }
}, initialState);
