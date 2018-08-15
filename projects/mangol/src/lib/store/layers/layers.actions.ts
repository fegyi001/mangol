import { Action } from '@ngrx/store';

import { MangolLayer } from './../../classes/Layer';

export enum LayersActionTypes {
  AddLayers = '[Layers] Add Layers'
}

export class AddLayers implements Action {
  readonly type = LayersActionTypes.AddLayers;
  constructor(public payload: MangolLayer[]) {}
}

export type LayersActions = AddLayers;
