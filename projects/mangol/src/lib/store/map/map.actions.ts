import { Action } from '@ngrx/store';
import Map from 'ol/Map';

export enum MapActionTypes {
  AddMap = '[Map] Add Map'
}

export class AddMap implements Action {
  readonly type = MapActionTypes.AddMap;
  constructor(public payload: Map) {}
}

export type MapActions = AddMap;
