import * as MeasureActions from './measure.actions';

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

export function measureReducer(
  state = initialState,
  action: MeasureActions.MeasureActions
) {
  switch (action.type) {
    case MeasureActions.HAS_MEASURE:
      return { ...state, hasMeasure: action.payload };
    case MeasureActions.SET_DISABLED:
      return { ...state, disabled: action.payload };
    case MeasureActions.SET_TITLE:
      return { ...state, title: action.payload };
    default:
      return state;
  }
}
