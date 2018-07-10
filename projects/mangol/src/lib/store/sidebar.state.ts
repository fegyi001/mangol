import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';

export class ToggleSidebar {
  static readonly type = '[Sidebar] Toggle Sidebar';
  constructor() {}
}

export class SetHasSidebar {
  static readonly type = '[Sidebar] Set Has Sidebar';
  constructor(public payload: boolean) {}
}

export class SetSidebarMode {
  static readonly type = '[Sidebar] Set Sidebar Mode';
  constructor(public payload: string) {}
}

export class SetSidebarCollapsible {
  static readonly type = '[Sidebar] Set Sidebar Collapsible';
  constructor(public payload: boolean) {}
}

export class SetSidebarOpened {
  static readonly type = '[Sidebar] Set Sidebar Opened';
  constructor(public payload: boolean) {}
}

export class SetSidebarTitle {
  static readonly type = '[Sidebar] Set Sidebar Title';
  constructor(public payload: string) {}
}

export interface SidebarStateModel {
  hasSidebar: boolean;
  opened: boolean;
  collapsible: boolean;
  title: string;
  mode: string;
}

@State<SidebarStateModel>({
  name: 'sidebar',
  defaults: {
    hasSidebar: false,
    collapsible: true,
    opened: false,
    title: null,
    mode: 'side'
  }
})
export class SidebarState {
  @Action(ToggleSidebar)
  toggleSidebar(ctx: StateContext<SidebarStateModel>, action: ToggleSidebar) {
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
  setSidebarMode(ctx: StateContext<SidebarStateModel>, action: SetSidebarMode) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.mode = action.payload;
      })
    );
  }
  @Action(SetSidebarCollapsible)
  setSidebarCollapsible(
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
  setSidebarOpened(
    ctx: StateContext<SidebarStateModel>,
    action: SetSidebarOpened
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.opened = action.payload;
      })
    );
  }
  @Action(SetSidebarTitle)
  setSidebarTitle(
    ctx: StateContext<SidebarStateModel>,
    action: SetSidebarTitle
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.title = action.payload;
      })
    );
  }
}
