import { Action } from '@ngrx/store';

export const HAS_PRINT = '[Print] Has Print ';
export const SET_DISABLED = '[Print] Set Disabled';
export const SET_TITLE = '[Print] Set Title';

export class HasPrint implements Action {
  readonly type = HAS_PRINT;
  constructor(public payload: boolean) {}
}
export class SetDisabled implements Action {
  readonly type = SET_DISABLED;
  constructor(public payload: boolean) {}
}
export class SetTitle implements Action {
  readonly type = SET_TITLE;
  constructor(public payload: string) {}
}

export type PrintActions = HasPrint | SetDisabled | SetTitle;
