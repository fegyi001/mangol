import * as PrintActions from './print.actions';

export interface State {
  hasPrint: boolean;
  disabled: boolean;
  title: string;
}

const initialState: State = {
  hasPrint: false,
  disabled: false,
  title: 'Print'
};

export function printReducer(
  state = initialState,
  action: PrintActions.PrintActions
) {
  switch (action.type) {
    case PrintActions.HAS_PRINT:
      return { ...state, hasPrint: action.payload };
    case PrintActions.SET_DISABLED:
      return { ...state, disabled: action.payload };
    case PrintActions.SET_TITLE:
      return { ...state, title: action.payload };
    default:
      return state;
  }
}
