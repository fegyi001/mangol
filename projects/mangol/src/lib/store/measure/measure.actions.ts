import { Action } from '@ngrx/store';

export const HAS_MEASURE = '[Measure] Has Measure';
export const SET_DISABLED = '[Measure] Set Disabled';
export const SET_TITLE = '[Measure] Set Title';

export class HasMeasure implements Action {
  readonly type = HAS_MEASURE;
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

export type MeasureActions = HasMeasure | SetDisabled | SetTitle;
