import produce from 'immer';
import VectorLayer from 'ol/layer/Vector';

import { CursorMode } from './../../interfaces/cursor-mode';
import { CursorActions, CursorActionTypes } from './cursor.actions';

export interface State {
  mode: CursorMode;
  visible: boolean;
  layer: VectorLayer;
}

const initialState: State = {
  mode: { text: null, cursor: 'default' },
  visible: false,
  layer: null
};

export const cursorReducer = produce<State, CursorActions>((draft, action) => {
  switch (action.type) {
    case CursorActionTypes.SetMode:
      draft.mode = action.payload;
      break;
    case CursorActionTypes.ResetMode:
      draft.mode = { text: null, cursor: 'default' } as CursorMode;
      break;
    case CursorActionTypes.SetVisible:
      draft.visible = action.payload;
      break;
    case CursorActionTypes.SetLayer:
      draft.layer = action.payload;
      break;
  }
}, initialState);
