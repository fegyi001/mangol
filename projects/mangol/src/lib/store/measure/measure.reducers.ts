import produce from 'immer';

import { MeasureActions, MeasureActionTypes } from './measure.actions';

export interface State {
  hasMeasure: boolean;
  disabled: boolean;
  title: string;
}

const initialState: State = {
  hasMeasure: false,
  disabled: false,
  title: 'Measure'
};

export const measureReducer = produce<State, MeasureActions>(
  (draft, action) => {
    switch (action.type) {
      case MeasureActionTypes.HasMeasure:
        draft.hasMeasure = action.payload;
        break;
      case MeasureActionTypes.SetDisabled:
        draft.disabled = action.payload;
        break;
      case MeasureActionTypes.SetTitle:
        draft.title = action.payload;
        break;
    }
  },
  initialState
);
