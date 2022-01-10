import { Action } from '@ngrx/store'

import { PrintDictionary } from '../../interfaces/config-toolbar.interface'
import { PrintLayout, PrintSize } from './print.reducers'

export const HAS_PRINT = '[Print] Has Print '
export const SET_DISABLED = '[Print] Set Disabled'
export const SET_TITLE = '[Print] Set Title'
export const SET_RESOLUTIONS = '[Print] Set Resolutions'
export const SET_SIZES = '[Print] Set Sizes'
export const SET_LAYOUTS = '[Print] Set Layouts'
export const SET_DICTIONARY = '[Print] Set Dictionary'
export const SET_SELECTED_LAYOUT = '[Print] Set Selected Layout'
export const SET_SELECTED_RESOLUTION = '[Print] Set Selected Resolution'
export const SET_SELECTED_SIZE = '[Print] Set Selected Size'

export class HasPrint implements Action {
  readonly type = HAS_PRINT
  constructor(public payload: boolean) {}
}
export class SetDisabled implements Action {
  readonly type = SET_DISABLED
  constructor(public payload: boolean) {}
}
export class SetTitle implements Action {
  readonly type = SET_TITLE
  constructor(public payload: string) {}
}
export class SetResolutions implements Action {
  readonly type = SET_RESOLUTIONS
  constructor(public payload: number[]) {}
}
export class SetSizes implements Action {
  readonly type = SET_SIZES
  constructor(public payload: PrintSize[]) {}
}
export class SetLayouts implements Action {
  readonly type = SET_LAYOUTS
  constructor(public payload: PrintLayout[]) {}
}
export class SetDictionary implements Action {
  readonly type = SET_DICTIONARY
  constructor(public payload: PrintDictionary) {}
}
export class SetSelectedLayout implements Action {
  readonly type = SET_SELECTED_LAYOUT
  constructor(public payload: PrintLayout) {}
}
export class SetSelectedResolution implements Action {
  readonly type = SET_SELECTED_RESOLUTION
  constructor(public payload: number) {}
}
export class SetSelectedSize implements Action {
  readonly type = SET_SELECTED_SIZE
  constructor(public payload: PrintSize) {}
}

export type PrintActions =
  | HasPrint
  | SetDisabled
  | SetTitle
  | SetResolutions
  | SetSizes
  | SetLayouts
  | SetDictionary
  | SetSelectedLayout
  | SetSelectedResolution
  | SetSelectedSize
