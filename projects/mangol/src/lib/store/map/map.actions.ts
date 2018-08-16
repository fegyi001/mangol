import { Action } from '@ngrx/store';
import Map from 'ol/Map';

export const ADD_MAP = '[Map] Add Map';

export class AddMap implements Action {
  readonly type = ADD_MAP;
  constructor(public payload: Map) {}
}

export type MapActions = AddMap;
