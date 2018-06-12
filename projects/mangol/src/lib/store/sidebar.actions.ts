import { State, Action, StateContext } from '@ngxs/store';
export class ToggleSidebar {
  static readonly type = '[Sidebar] Toggle Sidebar';
  constructor() {}
}

export class SetHasSidebar {
  static readonly type = '[Sidebar] Set Has Sidebar';
  constructor(public hasSidebar: boolean) {}
}

export class SetSidebarMode {
  static readonly type = '[Sidebar] Set Sidebar Mode';
  constructor(public mode: string) {}
}

export class SetSidebarCollapsible {
  static readonly type = '[Sidebar] Set Sidebar Collapsible';
  constructor(public collapsible: boolean) {}
}

export class SetSidebarOpened {
  static readonly type = '[Sidebar] Set Sidebar Opened';
  constructor(public opened: boolean) {}
}

export class SetSidebarTitle {
  static readonly type = '[Sidebar] Set Sidebar Title';
  constructor(public title: string) {}
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
    const state = ctx.getState();
    ctx.setState({
      ...state,
      opened: !state.opened
    });
  }
  @Action(SetHasSidebar)
  setHasSidebar(ctx: StateContext<SidebarStateModel>, action: SetHasSidebar) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      hasSidebar: action.hasSidebar
    });
  }
  @Action(SetSidebarMode)
  setSidebarMode(ctx: StateContext<SidebarStateModel>, action: SetSidebarMode) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      mode: action.mode
    });
  }
  @Action(SetSidebarCollapsible)
  setSidebarCollapsible(
    ctx: StateContext<SidebarStateModel>,
    action: SetSidebarCollapsible
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      collapsible: action.collapsible
    });
  }
  @Action(SetSidebarOpened)
  setSidebarOpened(
    ctx: StateContext<SidebarStateModel>,
    action: SetSidebarOpened
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      opened: action.opened
    });
  }
  @Action(SetSidebarTitle)
  setSidebarTitle(
    ctx: StateContext<SidebarStateModel>,
    action: SetSidebarTitle
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      title: action.title
    });
  }
}
