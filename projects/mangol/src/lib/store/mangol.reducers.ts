import { ActionReducer, ActionReducerMap, combineReducers, Action, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromConfig from './config/config.reducers';
import * as fromControllers from './controllers/controllers.reducers';
import * as fromCursor from './cursor/cursor.reducers';
import * as fromFeatureinfo from './featureinfo/featureinfo.reducers';
import * as fromLayers from './layers/layers.reducers';
import * as fromLayertree from './layertree/layertree.reducers';
import * as MangolActions from './mangol.actions';
import * as fromMap from './map/map.reducers';
import * as fromMeasure from './measure/measure.reducers';
import * as fromPrint from './print/print.reducers';
import * as fromSidebar from './sidebar/sidebar.reducers';
import State from 'ol/source/State';
import { create } from 'ol/transform';

export const mangolFeatureKey = 'mangol';

export interface MangolState {
  config: fromConfig.State;
  controllers: fromControllers.State;
  cursor: fromCursor.State;
  featureinfo: fromFeatureinfo.State;
  layers: fromLayers.State;
  layertree: fromLayertree.State;
  map: fromMap.State;
  measure: fromMeasure.State;
  print: fromPrint.State;
  sidebar: fromSidebar.State;
}

export const mangolReducers: ActionReducerMap<MangolState> = {
  config: fromConfig.configReducer,
  controllers: fromControllers.controllersReducer,
  cursor: fromCursor.cursorReducer,
  featureinfo: fromFeatureinfo.featureinfoReducer,
  layers: fromLayers.layersReducer,
  layertree: fromLayertree.layertreeReducer,
  map: fromMap.mapReducer,
  measure: fromMeasure.measureReducer,
  print: fromPrint.printReducer,
  sidebar: fromSidebar.sidebarReducer
};



// export function clearState(
//   reducer: ActionReducer<MangolState>
// ): ActionReducer<MangolState> {
//   return function(
//     state: MangolState,
//     action: MangolActions.MangolActions
//   ): MangolState {
//     switch (action.type) {
//       case MangolActions.CLEAR_STATE:
//         state = undefined;
//         break;
//       default:
//         break;
//     }
//     return reducer(state, action);
//   };
// }

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: MangolState | undefined, action: Action) {
  return combineReducers({
    config: fromConfig.configReducer,
    controllers: fromControllers.controllersReducer,
    cursor: fromCursor.cursorReducer,
    featureinfo: fromFeatureinfo.featureinfoReducer,
    layers: fromLayers.layersReducer,
    layertree: fromLayertree.layertreeReducer,
    map: fromMap.mapReducer,
    measure: fromMeasure.measureReducer,
    print: fromPrint.printReducer,
    sidebar: fromSidebar.sidebarReducer
  })(state, action);
}

export const getMangolState = createFeatureSelector<MangolState>(
  mangolFeatureKey
);

export const getMapState = createSelector(
  getMangolState,
  state => state.map
);

export const getConfigState = createSelector(
  getMangolState,
  state => state.config
);

export const getSidebarState = createSelector(
  getMangolState,
  state => state.sidebar
);

export const getControllersState = createSelector(
  getMangolState,
  state => state.controllers
);

export const getCursorState = createSelector(
  getMangolState,
  state => state.cursor
);

export const getLayersState = createSelector(
  getMangolState,
  state => state.layers
);

export const getLayertreeState = createSelector(
  getMangolState,
  state => state.layertree
);

export const getFeatureInfoState = createSelector(
  getMangolState,
  state => state.featureinfo
);

export const getMeasureState = createSelector(
  getMangolState,
  state => state.measure
);


export const getHasSidebar = createSelector(
  getMangolState,
  state => state.sidebar.hasSidebar
);

export const getSidebarOpened = createSelector(
  getMangolState,
  state => state.sidebar.opened
);

export const getSidebarMode = createSelector(
  getMangolState,
  state => state.sidebar.mode
);

export const getSidebarCollapsible = createSelector(
  getMangolState,
  state => state.sidebar.collapsible
);

export const getSidebarTitle = createSelector(
  getMangolState,
  state => state.sidebar.title
);

export const getSidebarSelectedModule = createSelector(
  getMangolState,
  state => state.sidebar.selectedModule
);

export const getMap = createSelector(
  getMangolState,
  state => state.map.map
);

export const getConfig = createSelector(
  getMangolState,
  state => state.config.config
);

export const getPrintConfig = createSelector(
  getConfig,
  state => state.sidebar.toolbar.print
);

export const getLayers = createSelector(
  getMangolState,
  state => state.layers.layers
);

export const getMeasureLayer = createSelector(
  getMangolState,
  state => state.layers.measureLayer
);

export const getMeasureMode = createSelector(
  getMangolState,
  state => state.measure.mode
);

export const getMeasureModes = createSelector(
  getMangolState,
  state => state.measure.modes
);

export const getMeasureDictionary = createSelector(
  getMangolState,
  state => state.measure.dictionary
);


export const getMeasureTitle = createSelector(
  getMangolState,
  state => state.measure.title
);

export const getHasMeasure = createSelector(
  getMangolState,
  state => state.measure.hasMeasure
);

export const getMeasureDisabled = createSelector(
  getMangolState,
  state => state.measure.disabled
);

export const getMeasureConfig = createSelector(
  getConfig,
  state => state.sidebar.toolbar.measure
);

export const getVectorLayer = createSelector(
  getMangolState,
  state => state.cursor.layer
);

export const getCursorMode = createSelector(
  getMangolState,
  state => state.cursor.mode
);

export const getCursorModeText = createSelector(
  getMangolState,
  state => state.cursor.mode.text
);

export const getCursorVisible = createSelector(
  getMangolState,
  state => state.cursor.visible
);

export const getHasLayerTree = createSelector(
  getMangolState,
  state => state.layertree.hasLayertree
);

export const getLayertreeTitle = createSelector(
  getMangolState,
  state => state.layertree.title
);

export const getLayertreeDisabled = createSelector(
  getMangolState,
  state => state.layertree.disabled
);

export const getLayerGroupDictionary = createSelector(
  getMangolState,
  state => state.layertree.dictionary
);

export const getLayerGroupShowBadges = createSelector(
  getMangolState,
  state => state.layertree.showLayergroupBadges
);

export const getControllersPosition = createSelector(
  getMangolState,
  state => state.controllers.position
);

export const getControllersCoordinates = createSelector(
  getControllersPosition,
  state => state.coordinates
);


export const getControllersZoom = createSelector(
  getMangolState,
  state => state.controllers.zoom
);

export const getControllersRotation = createSelector(
  getMangolState,
  state => state.controllers.rotation
);

export const getControllersFullScreen = createSelector(
  getMangolState,
  state => state.controllers.fullScreen
);

export const getFeatureInfo = createSelector(
  getMangolState,
  state => state.featureinfo
);

export const getFeatureHoverColor = createSelector(
  getFeatureInfo,
  state => state.hoverColor
);

export const getFeatureMaxFeatures = createSelector(
  getFeatureInfo,
  state => state.maxFeatures
);

export const getFeatureSelectedLayer = createSelector(
  getFeatureInfo,
  state => state.selectedLayer
);

export const getFeatureResultsLayer = createSelector(
  getFeatureInfo,
  state => state.resultsLayer
);

export const getFeatureResultItems = createSelector(
  getFeatureInfo,
  state => state.resultsItems
);

export const getFeatureDictionary = createSelector(
  getFeatureInfo,
  state => state.dictionary
);

export const getHasFeatureInfo = createSelector(
  getFeatureInfo,
  state => state.hasFeatureinfo
);

export const getFeatureInfoTitle = createSelector(
  getFeatureInfo,
  state => state.title
);

export const getFeatureInfoDisabled = createSelector(
  getFeatureInfo,
  state => state.disabled
);

export const getFeatureSnackbarduration = createSelector(
  getFeatureInfo,
  state => state.snackbarDuration
);

export const getQueryableLayers = createSelector(
  getLayers,
  state =>  state.filter(layer => layer.queryable)
);


export const getPrint = createSelector(
  getMangolState,
  state => state.print
);

export const getHasPrint = createSelector(
  getPrint,
  state => state.hasPrint
);

export const getPrintTitle = createSelector(
  getPrint,
  state => state.title
);

export const getPrintDisabled = createSelector(
  getPrint,
  state => state.disabled
);

export const getPrintDictionary = createSelector(
  getPrint,
  state => state.dictionary
);


export const getPrintSizes = createSelector(
  getPrint,
  state => state.sizes
);

export const getPrintSelectedSize = createSelector(
  getPrint,
  state => state.selectedSize
);

export const getPrintResolutions = createSelector(
  getPrint,
  state => state.resolutions
);

export const getPrintSelectedResolution = createSelector(
  getPrint,
  state => state.selectedResolution
);

export const getPrintLayouts = createSelector(
  getPrint,
  state => state.layouts
);


export const getPrintSelectedLayout = createSelector(
  getPrint,
  state => state.selectedLayout
);

