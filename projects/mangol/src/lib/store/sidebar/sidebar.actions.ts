import { Action } from '@ngrx/store';

export enum SidebarActionTypes {
  Toggle = '[Sidebar] Toggle',
  SetHasSidebar = '[Sidebar] Set Has Sidebar',
  SetMode = '[Sidebar] Set Mode',
  SetCollapsible = '[Sidebar] Set Collapsible',
  SetOpened = '[Sidebar] Set Opened',
  SetTitle = '[Sidebar] Set Title',
  SetSelectedModule = '[Sidebar] Set Selected Module'
}

export class Toggle implements Action {
  readonly type = SidebarActionTypes.Toggle;
  constructor() {}
}
export class SetHasSidebar implements Action {
  readonly type = SidebarActionTypes.SetHasSidebar;
  constructor(public payload: boolean) {}
}
export class SetMode implements Action {
  readonly type = SidebarActionTypes.SetMode;
  constructor(public payload: string) {}
}
export class SetCollapsible implements Action {
  readonly type = SidebarActionTypes.SetCollapsible;
  constructor(public payload: boolean) {}
}
export class SetOpened implements Action {
  readonly type = SidebarActionTypes.SetOpened;
  constructor(public payload: boolean) {}
}
export class SetTitle implements Action {
  readonly type = SidebarActionTypes.SetTitle;
  constructor(public payload: string) {}
}
export class SetSelectedModule implements Action {
  readonly type = SidebarActionTypes.SetSelectedModule;
  constructor(public payload: string) {}
}

export type SidebarActions =
  | Toggle
  | SetHasSidebar
  | SetMode
  | SetCollapsible
  | SetOpened
  | SetTitle
  | SetSelectedModule;
