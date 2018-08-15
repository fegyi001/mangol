import produce from 'immer';

import { PrintActions, PrintActionTypes } from './print.actions';

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

export const printReducer = produce<State, PrintActions>((draft, action) => {
  switch (action.type) {
    case PrintActionTypes.HasPrint:
      draft.hasPrint = action.payload;
      break;
    case PrintActionTypes.SetDisabled:
      draft.disabled = action.payload;
      break;
    case PrintActionTypes.SetTitle:
      draft.title = action.payload;
      break;
  }
}, initialState);
