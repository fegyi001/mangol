import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import { CursorMode } from './../../interfaces/cursor-mode';
import * as CursorActions from './cursor.actions';

export interface State {
  mode: CursorMode;
  visible: boolean;
  layer: VectorLayer<VectorSource<Point>>;
}

const initialState: State = {
  mode: { text: null, cursor: 'default' },
  visible: false,
  layer: null,
};

export function cursorReducer(
  state = initialState,
  action: CursorActions.CursorActions
) {
  switch (action.type) {
    case CursorActions.SET_MODE:
      const cursorLayer = state.layer;
      if (cursorLayer !== null) {
        cursorLayer.getSource().refresh();
      }
      return { ...state, mode: action.payload };
    case CursorActions.RESET_MODE:
      const layer = state.layer;
      if (layer !== null) {
        layer.getSource().refresh();
      }
      return { ...state, mode: initialState.mode };
    case CursorActions.SET_VISIBLE:
      return { ...state, visible: action.payload };
    case CursorActions.SET_LAYER:
      return { ...state, layer: action.payload };
    default:
      return state;
  }
}
