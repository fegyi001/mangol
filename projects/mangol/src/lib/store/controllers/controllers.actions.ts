import { Action } from '@ngrx/store';

import {
  MangolControllersPositionDictionary,
  MangolControllersRotationDictionary,
  MangolControllersScalebarOptions,
  MangolControllersZoomDictionary
} from '../../interfaces/config-map-controllers.interface';

export enum ControllersActionTypes {
  Reset = '[Controllers] Reset',
  SetShowZoom = '[Controllers] Set Show Zoom',
  SetZoomDictionary = '[Controllers] Set Zoom Dictionary',
  SetShowTooltip = '[Controllers] Set Zoom Show Tooltip',
  SetScalebar = '[Controllers] Set Scalebar',
  SetShowPosition = '[Controllers] Set Show Position',
  SetPositionPrecision = '[Controllers] Set Position Precision',
  SetPositionCoordinates = '[Controllers] Set Position Coordinates',
  SetPositionDictionary = '[Controllers] Set Position Dictionary',
  SetShowRotation = '[Controllers] Set Show Rotation',
  SetRotationDictionary = '[Controllers] Set Rotation Dictionary',
  SetShowRotationTooltip = '[Controllers] Set Show Rotation Tooltip',
  SetRotationValue = '[Controllers] Set Rotation Value'
}

export class Reset implements Action {
  readonly type = ControllersActionTypes.Reset;
  constructor() {}
}
export class SetShowZoom implements Action {
  readonly type = ControllersActionTypes.SetShowZoom;
  constructor(public payload: boolean) {}
}
export class SetZoomDictionary implements Action {
  readonly type = ControllersActionTypes.SetZoomDictionary;
  constructor(public payload: MangolControllersZoomDictionary) {}
}
export class SetShowTooltip implements Action {
  readonly type = ControllersActionTypes.SetShowTooltip;
  constructor(public payload: boolean) {}
}
export class SetScalebar implements Action {
  readonly type = ControllersActionTypes.SetScalebar;
  constructor(public payload: MangolControllersScalebarOptions) {}
}
export class SetShowPosition implements Action {
  readonly type = ControllersActionTypes.SetShowPosition;
  constructor(public payload: boolean) {}
}
export class SetPositionPrecision implements Action {
  readonly type = ControllersActionTypes.SetPositionPrecision;
  constructor(public payload: number) {}
}
export class SetPositionCoordinates implements Action {
  readonly type = ControllersActionTypes.SetPositionCoordinates;
  constructor(public payload: [number, number]) {}
}
export class SetPositionDictionary implements Action {
  readonly type = ControllersActionTypes.SetPositionDictionary;
  constructor(public payload: MangolControllersPositionDictionary) {}
}
export class SetShowRotation implements Action {
  readonly type = ControllersActionTypes.SetShowRotation;
  constructor(public payload: boolean) {}
}
export class SetRotationDictionary implements Action {
  readonly type = ControllersActionTypes.SetRotationDictionary;
  constructor(public payload: MangolControllersRotationDictionary) {}
}
export class SetShowRotationTooltip implements Action {
  readonly type = ControllersActionTypes.SetShowRotationTooltip;
  constructor(public payload: boolean) {}
}
export class SetRotationValue implements Action {
  readonly type = ControllersActionTypes.SetRotationValue;
  constructor(public payload: number) {}
}

export type ControllersActions =
  | Reset
  | SetShowZoom
  | SetZoomDictionary
  | SetShowTooltip
  | SetScalebar
  | SetShowPosition
  | SetPositionPrecision
  | SetPositionCoordinates
  | SetPositionDictionary
  | SetShowRotation
  | SetRotationDictionary
  | SetShowRotationTooltip
  | SetRotationValue;
