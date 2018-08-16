import { Action } from '@ngrx/store';

import { LayertreeDictionary } from './layertree.reducers';

export const HAS_LAYERTREE = '[Layertree] Has Layertree';
export const SET_DISABLED = '[Layertree] Set Disabled';
export const SET_TITLE = '[Layertree] Set Title';
export const SET_DICTIONARY = '[Layertree] Set Dictionary';
export const SHOW_LAYERGROUP_BADGES = '[Layertree] Show Layergroup Badges';

export class HasLayertree implements Action {
  readonly type = HAS_LAYERTREE;
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
  constructor(public payload: LayertreeDictionary) {}
}
export class ShowLayergroupBadges implements Action {
  readonly type = SHOW_LAYERGROUP_BADGES;
  constructor(public payload: boolean) {}
}

export type LayertreeActions =
  | HasLayertree
  | SetDisabled
  | SetTitle
  | SetDictionary
  | ShowLayergroupBadges;
