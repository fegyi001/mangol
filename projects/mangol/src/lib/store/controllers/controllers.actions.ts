import { Action } from '@ngrx/store'

import {
  MangolControllersFullScreenDictionary,
  MangolControllersPositionDictionary,
  MangolControllersRotationDictionary,
  MangolControllersScalebarOptions,
  MangolControllersZoomDictionary
} from '../../interfaces/config-map-controllers.interface'

export const RESET = '[Controllers] Reset'
export const SET_SHOW_ZOOM = '[Controllers] Set Show Zoom'
export const SET_ZOOM_DICTIONARY = '[Controllers] Set Zoom Dictionary'
export const SET_SHOW_TOOLTIP = '[Controllers] Set Zoom Show Tooltip'
export const SET_SCALEBAR = '[Controllers] Set Scalebar'
export const SET_SHOW_POSITION = '[Controllers] Set Show Position'
export const SET_POSITION_PRECISION = '[Controllers] Set Position Precision'
export const SET_POSITION_COORDINATES = '[Controllers] Set Position Coordinates'
export const SET_POSITION_DICTIONARY = '[Controllers] Set Position Dictionary'
export const SET_SHOW_ROTATION = '[Controllers] Set Show Rotation'
export const SET_ROTATION_DICTIONARY = '[Controllers] Set Rotation Dictionary'
export const SET_SHOW_ROTATION_TOOLTIP =
  '[Controllers] Set Show Rotation Tooltip'
export const SET_ROTATION_VALUE = '[Controllers] Set Rotation Value'
export const SET_SHOW_FULLSCREEN = '[Controllers] Set Show FullScreen'
export const SET_SHOW_FULLSCREEN_TOOLTIP =
  '[Controllers] Set Show FullScreen Tooltip'
export const SET_FULLSCREEN_DICTIONARY =
  '[Controllers] Set FullScreen Dictionary'

export class Reset implements Action {
  readonly type = RESET
}
export class SetShowZoom implements Action {
  readonly type = SET_SHOW_ZOOM
  constructor(public payload: boolean) {}
}
export class SetZoomDictionary implements Action {
  readonly type = SET_ZOOM_DICTIONARY
  constructor(public payload: MangolControllersZoomDictionary) {}
}
export class SetShowTooltip implements Action {
  readonly type = SET_SHOW_TOOLTIP
  constructor(public payload: boolean) {}
}
export class SetScalebar implements Action {
  readonly type = SET_SCALEBAR
  constructor(public payload: MangolControllersScalebarOptions) {}
}
export class SetShowPosition implements Action {
  readonly type = SET_SHOW_POSITION
  constructor(public payload: boolean) {}
}
export class SetPositionPrecision implements Action {
  readonly type = SET_POSITION_PRECISION
  constructor(public payload: number) {}
}
export class SetPositionCoordinates implements Action {
  readonly type = SET_POSITION_COORDINATES
  constructor(public payload: [number, number]) {}
}
export class SetPositionDictionary implements Action {
  readonly type = SET_POSITION_DICTIONARY
  constructor(public payload: MangolControllersPositionDictionary) {}
}
export class SetShowRotation implements Action {
  readonly type = SET_SHOW_ROTATION
  constructor(public payload: boolean) {}
}
export class SetRotationDictionary implements Action {
  readonly type = SET_ROTATION_DICTIONARY
  constructor(public payload: MangolControllersRotationDictionary) {}
}
export class SetShowRotationTooltip implements Action {
  readonly type = SET_SHOW_ROTATION_TOOLTIP
  constructor(public payload: boolean) {}
}
export class SetRotationValue implements Action {
  readonly type = SET_ROTATION_VALUE
  constructor(public payload: number) {}
}
export class SetShowFullscreen implements Action {
  readonly type = SET_SHOW_FULLSCREEN
  constructor(public payload: boolean) {}
}
export class SetShowFullscreenTooltip implements Action {
  readonly type = SET_SHOW_FULLSCREEN_TOOLTIP
  constructor(public payload: boolean) {}
}
export class SetFullscreenDictionary implements Action {
  readonly type = SET_FULLSCREEN_DICTIONARY
  constructor(public payload: MangolControllersFullScreenDictionary) {}
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
  | SetRotationValue
  | SetShowFullscreen
  | SetShowFullscreenTooltip
  | SetFullscreenDictionary
