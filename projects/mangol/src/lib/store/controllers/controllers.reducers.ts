import produce from 'immer';

import {
  MangolControllersPositionOptions,
  MangolControllersRotationOptions,
  MangolControllersScalebarOptions,
  MangolControllersZoomOptions
} from './../../interfaces/config-map-controllers.interface';
import {
  ControllersActions,
  ControllersActionTypes
} from './controllers.actions';

export interface MangolControllersPositionStateModel
  extends MangolControllersPositionOptions {
  coordinates: number[];
}

export interface MangolControllersRotationStateModel
  extends MangolControllersRotationOptions {
  rotation: number;
}

export interface ControllersStateModel {
  zoom: MangolControllersZoomOptions;
  scalebar: MangolControllersScalebarOptions;
  position: MangolControllersPositionStateModel;
  rotation: MangolControllersRotationStateModel;
}

export interface State {
  zoom: MangolControllersZoomOptions;
  scalebar: MangolControllersScalebarOptions;
  position: MangolControllersPositionStateModel;
  rotation: MangolControllersRotationStateModel;
}

const initialState: State = {
  zoom: {
    show: false,
    dictionary: {
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out'
    },
    showTooltip: true
  },
  scalebar: { show: false },
  position: {
    show: false,
    coordinates: [],
    precision: 2,
    dictionary: {
      textCopied: 'Copied',
      copyCoordinates: 'Copy coordinates',
      closeSnackbar: 'Close'
    }
  },
  rotation: {
    show: false,
    dictionary: { rotateToNorth: 'Rotate to North' },
    showTooltip: true,
    rotation: 0
  }
};

export const controllersReducer = produce<State, ControllersActions>(
  (draft, action) => {
    switch (action.type) {
      case ControllersActionTypes.Reset:
        draft = initialState;
        break;
      case ControllersActionTypes.SetShowZoom:
        draft.zoom.show = action.payload;
        break;
      case ControllersActionTypes.SetZoomDictionary:
        draft.zoom.dictionary = action.payload;
        break;
      case ControllersActionTypes.SetShowTooltip:
        draft.zoom.showTooltip = action.payload;
        break;
      case ControllersActionTypes.SetScalebar:
        draft.scalebar = action.payload;
        break;
      case ControllersActionTypes.SetShowPosition:
        draft.position.show = action.payload;
        break;
      case ControllersActionTypes.SetPositionPrecision:
        draft.position.precision = action.payload;
        break;
      case ControllersActionTypes.SetPositionCoordinates:
        draft.position.coordinates = action.payload;
        break;
      case ControllersActionTypes.SetPositionDictionary:
        draft.position.dictionary = action.payload;
        break;
      case ControllersActionTypes.SetShowRotation:
        draft.rotation.show = action.payload;
        break;
      case ControllersActionTypes.SetRotationDictionary:
        draft.rotation.dictionary = action.payload;
        break;
      case ControllersActionTypes.SetShowRotationTooltip:
        draft.rotation.showTooltip = action.payload;
        break;
      case ControllersActionTypes.SetRotationValue:
        draft.rotation.rotation = action.payload;
        break;
    }
  },
  initialState
);
