import { Action } from '@ngrx/store';
import Map from 'ol/Map';

export const SET_MAP = '[Map] Set Map';

export class SetMap implements Action {
  readonly type = SET_MAP;
  constructor(public payload: Map) {}
}

export type MapActions = SetMap;
