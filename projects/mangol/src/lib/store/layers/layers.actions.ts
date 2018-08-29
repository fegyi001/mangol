import { Action } from '@ngrx/store';

import { MangolLayer } from './../../classes/Layer';
import VectorLayer from 'ol/layer/Vector';

export const ADD_LAYERS = '[Layers] Add Layers';
export const SET_MEASURE_LAYER = '[Layers] Set Measure Layer';

export class AddLayers implements Action {
  readonly type = ADD_LAYERS;
  constructor(public payload: MangolLayer[]) {}
}
export class SetMeasureLayer implements Action {
  readonly type = SET_MEASURE_LAYER;
  constructor(public payload: VectorLayer) {}
}

export type LayersActions = AddLayers | SetMeasureLayer;
