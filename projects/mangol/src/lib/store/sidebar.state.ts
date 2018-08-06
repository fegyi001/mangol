import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';

export class ToggleSidebar {
  static readonly type = '[Sidebar] Toggle';
  constructor() {}
}

export class SetHasSidebar {
  static readonly type = '[Sidebar] Set Has Sidebar';
  constructor(public payload: boolean) {}
}

export class SetSidebarMode {
  static readonly type = '[Sidebar] Set Mode';
  constructor(public payload: string) {}
}

export class SetSidebarCollapsible {
  static readonly type = '[Sidebar] Set Collapsible';
  constructor(public payload: boolean) {}
}

export class SetSidebarOpened {
  static readonly type = '[Sidebar] Set Opened';
  constructor(public payload: boolean) {}
}

export class SetSidebarTitle {
  static readonly type = '[Sidebar] Set Title';
  constructor(public payload: string) {}
}

export class SetSidebarSelectedModule {
  static readonly type = '[Sidebar] Set Selected Module';
  constructor(public payload: string) {}
}

export interface SidebarStateModel {
  hasSidebar: boolean;
  opened: boolean;
  collapsible: boolean;
  title: string;
  mode: string;
  selectedModule: string;
}

@State<SidebarStateModel>({
  name: 'sidebar',
  defaults: {
    hasSidebar: false,
    collapsible: true,
    opened: false,
    title: null,
    mode: 'side',
    selectedModule: null
  }
})
export class SidebarState {
  @Action(ToggleSidebar)
  toggle(ctx: StateContext<SidebarStateModel>, action: ToggleSidebar) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.opened = !draft.opened;
      })
    );
  }
  @Action(SetHasSidebar)
  setHasSidebar(ctx: StateContext<SidebarStateModel>, action: SetHasSidebar) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.hasSidebar = action.payload;
      })
    );
  }
  @Action(SetSidebarMode)
  setMode(ctx: StateContext<SidebarStateModel>, action: SetSidebarMode) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.mode = action.payload;
      })
    );
  }
  @Action(SetSidebarCollapsible)
  setCollapsible(
    ctx: StateContext<SidebarStateModel>,
    action: SetSidebarCollapsible
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.collapsible = action.payload;
      })
    );
  }
  @Action(SetSidebarOpened)
  setOpened(ctx: StateContext<SidebarStateModel>, action: SetSidebarOpened) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.opened = action.payload;
      })
    );
  }
  @Action(SetSidebarTitle)
  setTitle(ctx: StateContext<SidebarStateModel>, action: SetSidebarTitle) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.title = action.payload;
      })
    );
  }
  @Action(SetSidebarSelectedModule)
  setSelectedModule(
    ctx: StateContext<SidebarStateModel>,
    action: SetSidebarSelectedModule
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.selectedModule = action.payload;
      })
    );
  }
}
