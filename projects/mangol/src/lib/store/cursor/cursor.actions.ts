import { Action } from '@ngrx/store';
import VectorLayer from 'ol/layer/Vector';

import { CursorMode } from './../../interfaces/cursor-mode';

export enum CursorActionTypes {
  SetMode = '[Cursor] Set Mode',
  ResetMode = '[Cursor] Reset Mode',
  SetVisible = '[Cursor] Set Visible',
  SetLayer = '[Cursor] Set Layer'
}

export class SetMode implements Action {
  readonly type = CursorActionTypes.SetMode;
  constructor(public payload: CursorMode) {}
}
export class ResetMode implements Action {
  readonly type = CursorActionTypes.ResetMode;
  constructor() {}
}
export class SetVisible implements Action {
  readonly type = CursorActionTypes.SetVisible;
  constructor(public payload: boolean) {}
}
export class SetLayer implements Action {
  readonly type = CursorActionTypes.SetLayer;
  constructor(public payload: VectorLayer) {}
}

export type CursorActions = SetMode | ResetMode | SetVisible | SetLayer;
