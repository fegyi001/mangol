import { Action } from '@ngrx/store';
import VectorLayer from 'ol/layer/Vector';

import { CursorMode } from './../../interfaces/cursor-mode';

export const SET_MODE = '[Cursor] Set Mode';
export const RESET_MODE = '[Cursor] Reset Mode';
export const SET_VISIBLE = '[Cursor] Set Visible';
export const SET_LAYER = '[Cursor] Set Layer';

export class SetMode implements Action {
  readonly type = SET_MODE;
  constructor(public payload: CursorMode) {}
}
export class ResetMode implements Action {
  readonly type = RESET_MODE;
  constructor() {}
}
export class SetVisible implements Action {
  readonly type = SET_VISIBLE;
  constructor(public payload: boolean) {}
}
export class SetLayer implements Action {
  readonly type = SET_LAYER;
  constructor(public payload: VectorLayer) {}
}

export type CursorActions = SetMode | ResetMode | SetVisible | SetLayer;
