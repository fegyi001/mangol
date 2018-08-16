import { Action } from '@ngrx/store';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';

import { MangolLayer } from './../../classes/Layer';
import { FeatureinfoDictionary } from './featureinfo.reducers';

export const HAS_FEATUREINFO = '[Featureinfo] Has Featureinfo';
export const SET_DISABLED = '[Featureinfo] Set Disabled';
export const SET_TITLE = '[Featureinfo] Set Title';
export const SET_MAX_FEATURES = '[Featureinfo] Set Max Features';
export const SET_LAYERS = '[Featureinfo] Set Layers';
export const SET_SELECTED_LAYER = '[Featureinfo] Set Selected Layer';
export const SET_RESULTS_LAYER = '[Featureinfo] Set Results Layer';
export const SET_RESULTS_ITEMS = '[Featureinfo] Set Results Items';
export const SET_DICTIONARY = '[Featureinfo] Set Dictionary';
export const SET_HOVER_COLOR = '[Featureinfo] Set Hover Color';

export class HasFeatureinfo implements Action {
  readonly type = HAS_FEATUREINFO;
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
export class SetMaxFeatures implements Action {
  readonly type = SET_MAX_FEATURES;
  constructor(public payload: number) {}
}
export class SetLayers implements Action {
  readonly type = SET_LAYERS;
  constructor(public payload: MangolLayer[]) {}
}
export class SetSelectedLayer implements Action {
  readonly type = SET_SELECTED_LAYER;
  constructor(public payload: MangolLayer) {}
}
export class SetResultsLayer implements Action {
  readonly type = SET_RESULTS_LAYER;
  constructor(public payload: VectorLayer) {}
}
export class SetResultsItems implements Action {
  readonly type = SET_RESULTS_ITEMS;
  constructor(public payload: Feature[]) {}
}
export class SetDictionary implements Action {
  readonly type = SET_DICTIONARY;
  constructor(public payload: FeatureinfoDictionary) {}
}
export class SetHoverColor implements Action {
  readonly type = SET_HOVER_COLOR;
  constructor(public payload: [number, number, number]) {}
}

export type FeatureinfoActions =
  | HasFeatureinfo
  | SetDisabled
  | SetTitle
  | SetMaxFeatures
  | SetLayers
  | SetSelectedLayer
  | SetResultsLayer
  | SetResultsItems
  | SetDictionary
  | SetHoverColor;
