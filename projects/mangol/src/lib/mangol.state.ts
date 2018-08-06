import { ConfigState, ConfigStateModel } from './store/config.state';
import { CursorState, CursorStateModel } from './store/cursor.state';
import {
  FeatureinfoState,
  FeatureinfoStateModel
} from './store/featureinfo.state';
import { LayersState, LayersStateModel } from './store/layers.state';
import { LayertreeState, LayertreeStateModel } from './store/layertree.state';
import { MapState, MapStateModel } from './store/map.state';
import { MeasureState, MeasureStateModel } from './store/measure.state';
import { PrintState, PrintStateModel } from './store/print.state';
import { SidebarState, SidebarStateModel } from './store/sidebar.state';

export interface MangolState {
  config: ConfigStateModel;
  featureinfo: FeatureinfoStateModel;
  layertree: LayertreeStateModel;
  map: MapStateModel;
  measure: MeasureStateModel;
  print: PrintStateModel;
  sidebar: SidebarStateModel;
  layers: LayersStateModel;
  cursor: CursorStateModel;
}

export const mangolStates = [
  ConfigState,
  FeatureinfoState,
  LayertreeState,
  MapState,
  MeasureState,
  PrintState,
  SidebarState,
  LayersState,
  CursorState
];
