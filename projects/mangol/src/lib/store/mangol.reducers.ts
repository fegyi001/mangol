import { ActionReducer, ActionReducerMap } from '@ngrx/store';

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

export function clearState(
  reducer: ActionReducer<MangolState>
): ActionReducer<MangolState> {
  return function(
    state: MangolState,
    action: MangolActions.MangolActions
  ): MangolState {
    switch (action.type) {
      case MangolActions.CLEAR_STATE:
        state = undefined;
        break;
      default:
        break;
    }
    return reducer(state, action);
  };
}
