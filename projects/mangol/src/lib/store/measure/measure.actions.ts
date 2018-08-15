import { Action } from '@ngrx/store';

export enum MeasureActionTypes {
  HasMeasure = '[Measure] Has Measure',
  SetDisabled = '[Measure] Set Disabled',
  SetTitle = '[Measure] Set Title'
}

export class HasMeasure implements Action {
  readonly type = MeasureActionTypes.HasMeasure;
  constructor(public payload: boolean) {}
}
export class SetDisabled implements Action {
  readonly type = MeasureActionTypes.SetDisabled;
  constructor(public payload: boolean) {}
}
export class SetTitle implements Action {
  readonly type = MeasureActionTypes.SetTitle;
  constructor(public payload: string) {}
}

export type MeasureActions = HasMeasure | SetDisabled | SetTitle;
