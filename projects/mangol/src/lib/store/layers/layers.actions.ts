import { Action } from '@ngrx/store';

import { MangolLayer } from './../../classes/Layer';

export const ADD_LAYERS = '[Layers] Add Layers';

export class AddLayers implements Action {
  readonly type = ADD_LAYERS;
  constructor(public payload: MangolLayer[]) {}
}

export type LayersActions = AddLayers;
