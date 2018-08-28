import { MeasureDictionary, MeasureMode } from './measure.reducers';
import { Action } from '@ngrx/store';

export const HAS_MEASURE = '[Measure] Has Measure';
export const SET_DISABLED = '[Measure] Set Disabled';
export const SET_TITLE = '[Measure] Set Title';
export const SET_DICTIONARY = '[Measure] Set Dictionary';
export const SET_MODE = '[Measure] Set Mode';

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
export class SetDictionary implements Action {
  readonly type = SET_DICTIONARY;
  constructor(public payload: MeasureDictionary) {}
}
export class SetMode implements Action {
  readonly type = SET_MODE;
  constructor(public payload: MeasureMode) {}
}

export type MeasureActions =
  | HasMeasure
  | SetDisabled
  | SetTitle
  | SetDictionary
  | SetMode;
