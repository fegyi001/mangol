import {
  MangolControllersPositionOptions,
  MangolControllersRotationOptions,
  MangolControllersScalebarOptions,
  MangolControllersZoomOptions,
  MangolControllersFullScreenOptions
} from './../../interfaces/config-map-controllers.interface';
import * as ControllersActions from './controllers.actions';

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
  fullScreen: MangolControllersFullScreenOptions;
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
  },
  fullScreen: {
    show: false,
    showTooltip: true,
    dictionary: {
      maximize: 'Maximize',
      minimize: 'Minimize'
    }
  }
};

export function controllersReducer(
  state = initialState,
  action: ControllersActions.ControllersActions
) {
  switch (action.type) {
    case ControllersActions.RESET:
      return {
        ...state,
        zoom: initialState.zoom,
        scalebar: initialState.scalebar,
        position: initialState.position,
        rotation: initialState.rotation,
        fullScreen: initialState.fullScreen
      };
    case ControllersActions.SET_SHOW_ZOOM:
      return { ...state, zoom: { ...state.zoom, show: action.payload } };
    case ControllersActions.SET_ZOOM_DICTIONARY:
      return { ...state, zoom: { ...state.zoom, dictionary: action.payload } };
    case ControllersActions.SET_SHOW_TOOLTIP:
      return { ...state, zoom: { ...state.zoom, showTooltip: action.payload } };
    case ControllersActions.SET_SCALEBAR:
      return { ...state, scalebar: action.payload };
    case ControllersActions.SET_SHOW_POSITION:
      return {
        ...state,
        position: { ...state.position, show: action.payload }
      };
    case ControllersActions.SET_POSITION_PRECISION:
      return {
        ...state,
        position: { ...state.position, precision: action.payload }
      };
    case ControllersActions.SET_POSITION_COORDINATES:
      return {
        ...state,
        position: { ...state.position, coordinates: action.payload }
      };
    case ControllersActions.SET_POSITION_DICTIONARY:
      return {
        ...state,
        position: { ...state.position, dictionary: action.payload }
      };
    case ControllersActions.SET_SHOW_ROTATION:
      return {
        ...state,
        rotation: { ...state.rotation, show: action.payload }
      };
    case ControllersActions.SET_ROTATION_DICTIONARY:
      return {
        ...state,
        rotation: { ...state.rotation, dictionary: action.payload }
      };
    case ControllersActions.SET_SHOW_ROTATION_TOOLTIP:
      return {
        ...state,
        rotation: { ...state.rotation, showTooltip: action.payload }
      };
    case ControllersActions.SET_ROTATION_VALUE:
      return {
        ...state,
        rotation: { ...state.rotation, rotation: action.payload }
      };
    case ControllersActions.SET_SHOW_FULLSCREEN:
      return {
        ...state,
        fullScreen: { ...state.fullScreen, show: action.payload }
      };
    case ControllersActions.SET_SHOW_FULLSCREEN_TOOLTIP:
      return {
        ...state,
        fullScreen: { ...state.fullScreen, showTooltip: action.payload }
      };
    case ControllersActions.SET_FULLSCREEN_DICTIONARY:
      return {
        ...state,
        fullScreen: { ...state.fullScreen, dictionary: action.payload }
      };
    default:
      return state;
  }
}
