import * as MeasureActions from './measure.actions';

export interface MeasureMode {
  type: string;
  fontIcon: string;
  fontSet: string;
}

export interface MeasureDictionary {
  clearSelection?: string;
  chooseMode?: string;
  clickOnMap?: string;
  closeSnackbar?: string;
  line?: string;
  area?: string;
  radius?: string;
}
export interface State {
  hasMeasure: boolean;
  disabled: boolean;
  title: string;
  modes: MeasureMode[];
  mode: MeasureMode;
  dictionary: MeasureDictionary;
}

const initialState: State = {
  hasMeasure: false,
  disabled: false,
  title: 'Measure',
  modes: [
    { type: 'line', fontSet: 'ms', fontIcon: 'ms-measure-distance' },
    { type: 'area', fontSet: 'ms', fontIcon: 'ms-measure-area' },
    { type: 'radius', fontSet: 'ms', fontIcon: 'ms-geolocation' }
  ],
  mode: null,
  dictionary: {
    clearSelection: 'Clear selection',
    chooseMode: 'Choose measure mode...',
    clickOnMap: 'Click on Map',
    closeSnackbar: 'Close',
    line: 'Line',
    area: 'Area',
    radius: 'Radius'
  }
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
    case MeasureActions.SET_DICTIONARY:
      return { ...state, dictionary: action.payload };
    case MeasureActions.SET_MODE:
      return { ...state, mode: action.payload };
    default:
      return state;
  }
}
