import { Action } from '@ngrx/store';

import { LayertreeDictionary } from './layertree.reducers';

export enum LayertreeActionTypes {
  HasLayertree = '[Layertree] Has Layertree',
  SetDisabled = '[Layertree] Set Disabled',
  SetTitle = '[Layertree] Set Title',
  SetDictionary = '[Layertree] Set Dictionary',
  ShowLayergroupBadges = '[Layertree] Show Layergroup Badges'
}

export class HasLayertree implements Action {
  readonly type = LayertreeActionTypes.HasLayertree;
  constructor(public payload: boolean) {}
}
export class SetDisabled implements Action {
  readonly type = LayertreeActionTypes.SetDisabled;
  constructor(public payload: boolean) {}
}
export class SetTitle implements Action {
  readonly type = LayertreeActionTypes.SetTitle;
  constructor(public payload: string) {}
}
export class SetDictionary implements Action {
  readonly type = LayertreeActionTypes.SetDictionary;
  constructor(public payload: LayertreeDictionary) {}
}
export class ShowLayergroupBadges implements Action {
  readonly type = LayertreeActionTypes.ShowLayergroupBadges;
  constructor(public payload: boolean) {}
}

export type LayertreeActions =
  | HasLayertree
  | SetDisabled
  | SetTitle
  | SetDictionary
  | ShowLayergroupBadges;
