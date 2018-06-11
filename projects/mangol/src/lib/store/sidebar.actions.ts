import { State, Action, StateContext } from '@ngxs/store';
export class ToggleSidebar {
  static readonly type = '[Sidebar] Toggle Sidebar';
  constructor() {}
}

export interface SidebarStateModel {
  opened: boolean;
  version: number;
}

@State<SidebarStateModel>({
  name: 'sidebar',
  defaults: {
    opened: false,
    version: 0
  }
})
export class SidebarState {
  @Action(ToggleSidebar)
  addMap(ctx: StateContext<SidebarStateModel>, action: ToggleSidebar) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      opened: !state.opened,
      version: state.version + 1
    });
  }
}
