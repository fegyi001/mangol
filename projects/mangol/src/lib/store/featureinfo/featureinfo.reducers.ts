import produce from 'immer';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';

import { MangolLayer } from './../../classes/Layer';
import {
  FeatureinfoActions,
  FeatureinfoActionTypes
} from './featureinfo.actions';

export interface FeatureinfoDictionary {
  clearSelection?: string;
  chooseLayer?: string;
  clickOnMap?: string;
  noLayers?: string;
  numberOfFeaturesFound?: string;
  closeSnackbar?: string;
  zoomToFeature?: string;
  showAllResults?: string;
  feature?: string;
  exportToCsv?: string;
}

export interface State {
  hasFeatureinfo: boolean;
  disabled: boolean;
  title: string;
  maxFeatures: number;
  layers: MangolLayer[];
  selectedLayer: MangolLayer;
  resultsLayer: VectorLayer;
  resultsItems: Feature[];
  snackbarDuration: number;
  hoverColor: [number, number, number];
  dictionary: FeatureinfoDictionary;
}

const initialState: State = {
  hasFeatureinfo: false,
  disabled: false,
  title: 'Select on Map',
  maxFeatures: 10,
  layers: [],
  selectedLayer: null,
  resultsLayer: null,
  resultsItems: [],
  snackbarDuration: 3000,
  hoverColor: [255, 255, 0],
  dictionary: {
    clearSelection: 'Clear selection',
    chooseLayer: 'Choose a layer...',
    clickOnMap: 'Click on Map',
    noLayers: 'There are currently no queryable layers configured.',
    numberOfFeaturesFound: 'Number of features found',
    closeSnackbar: 'Close',
    zoomToFeature: 'Zoom to Feature',
    showAllResults: 'Open results dialog',
    feature: 'Feature',
    exportToCsv: 'Export to CSV'
  }
};

export const featureinfoReducer = produce<State, FeatureinfoActions>(
  (draft, action) => {
    switch (action.type) {
      case FeatureinfoActionTypes.HasFeatureinfo:
        draft.hasFeatureinfo = action.payload;
        break;
      case FeatureinfoActionTypes.SetDisabled:
        draft.disabled = action.payload;
        break;
      case FeatureinfoActionTypes.SetTitle:
        draft.title = action.payload;
        break;
      case FeatureinfoActionTypes.SetMaxFeatures:
        draft.maxFeatures = action.payload;
        break;
      case FeatureinfoActionTypes.SetLayers:
        draft.layers = action.payload;
        break;
      case FeatureinfoActionTypes.SetSelectedLayer:
        draft.selectedLayer = action.payload;
        break;
      case FeatureinfoActionTypes.SetResultsLayer:
        draft.resultsLayer = action.payload;
        break;
      case FeatureinfoActionTypes.SetResultsItems:
        draft.resultsItems = action.payload;
        break;
      case FeatureinfoActionTypes.SetDictionary:
        draft.dictionary = action.payload;
        break;
      case FeatureinfoActionTypes.SetHoverColor:
        draft.hoverColor = action.payload;
        break;
    }
  },
  initialState
);
