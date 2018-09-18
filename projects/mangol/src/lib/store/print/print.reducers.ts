import { PrintDictionary } from './../../interfaces/config-toolbar.interface';
import * as PrintActions from './print.actions';

export interface PrintLayout {
  name: string;
  value: string;
}

const dictionary: PrintDictionary = {
  print: 'Print',
  layout: 'Layout',
  size: 'Size',
  resolution: 'Resolution',
  landscape: 'Landscape',
  portrait: 'Portrait'
};

const dims = {
  A5: [210, 148],
  A4: [297, 210],
  A3: [420, 297],
  A2: [594, 420],
  A1: [841, 594],
  A0: [1189, 841]
};

const sizes: string[] = [];
for (const key in dims) {
  if (dims.hasOwnProperty(key)) {
    sizes.push(key);
  }
}

export interface State {
  hasPrint: boolean;
  disabled: boolean;
  title: string;
  dims: any;
  layouts: PrintLayout[];
  resolutions: number[];
  sizes: string[];
  dictionary: PrintDictionary;
}

const initialState: State = {
  hasPrint: false,
  disabled: false,
  title: 'Print',
  dims: dims,
  resolutions: [72, 100, 150, 300],
  sizes: sizes,
  dictionary: dictionary,
  layouts: [
    {
      name: dictionary.landscape,
      value: 'landscape'
    },
    {
      name: dictionary.portrait,
      value: 'portrait'
    }
  ]
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
