import { FeatureinfoDictionary } from './featureinfo.reducers';
import { MangolLayer } from './../../classes/Layer';
import { Action } from '@ngrx/store';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';

export enum FeatureinfoActionTypes {
  HasFeatureinfo = '[Featureinfo] Has Featureinfo',
  SetDisabled = '[Featureinfo] Set Disabled',
  SetTitle = '[Featureinfo] Set Title',
  SetMaxFeatures = '[Featureinfo] Set Max Features',
  SetLayers = '[Featureinfo] Set Layers',
  SetSelectedLayer = '[Featureinfo] Set Selected Layer',
  SetResultsLayer = '[Featureinfo] Set Results Layer',
  SetResultsItems = '[Featureinfo] Set Results Items',
  SetDictionary = '[Featureinfo] Set Dictionary',
  SetHoverColor = '[Featureinfo] Set Hover Color'
}

export class HasFeatureinfo implements Action {
  readonly type = FeatureinfoActionTypes.HasFeatureinfo;
  constructor(public payload: boolean) {}
}
export class SetDisabled implements Action {
  readonly type = FeatureinfoActionTypes.SetDisabled;
  constructor(public payload: boolean) {}
}
export class SetTitle implements Action {
  readonly type = FeatureinfoActionTypes.SetTitle;
  constructor(public payload: string) {}
}
export class SetMaxFeatures implements Action {
  readonly type = FeatureinfoActionTypes.SetMaxFeatures;
  constructor(public payload: number) {}
}
export class SetLayers implements Action {
  readonly type = FeatureinfoActionTypes.SetLayers;
  constructor(public payload: MangolLayer[]) {}
}
export class SetSelectedLayer implements Action {
  readonly type = FeatureinfoActionTypes.SetSelectedLayer;
  constructor(public payload: MangolLayer) {}
}
export class SetResultsLayer implements Action {
  readonly type = FeatureinfoActionTypes.SetResultsLayer;
  constructor(public payload: VectorLayer) {}
}
export class SetResultsItems implements Action {
  readonly type = FeatureinfoActionTypes.SetResultsItems;
  constructor(public payload: Feature[]) {}
}
export class SetDictionary implements Action {
  readonly type = FeatureinfoActionTypes.SetDictionary;
  constructor(public payload: FeatureinfoDictionary) {}
}
export class SetHoverColor implements Action {
  readonly type = FeatureinfoActionTypes.SetHoverColor;
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
