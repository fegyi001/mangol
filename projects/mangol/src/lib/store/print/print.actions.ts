import { Action } from '@ngrx/store';

export enum PrintActionTypes {
  HasPrint = '[Print] Has Print ',
  SetDisabled = '[Print] Set Disabled',
  SetTitle = '[Print] Set Title'
}

export class HasPrint implements Action {
  readonly type = PrintActionTypes.HasPrint;
  constructor(public payload: boolean) {}
}
export class SetDisabled implements Action {
  readonly type = PrintActionTypes.SetDisabled;
  constructor(public payload: boolean) {}
}
export class SetTitle implements Action {
  readonly type = PrintActionTypes.SetTitle;
  constructor(public payload: string) {}
}

export type PrintActions = HasPrint | SetDisabled | SetTitle;
