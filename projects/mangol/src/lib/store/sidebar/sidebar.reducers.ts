import produce from 'immer';

import { SidebarActions, SidebarActionTypes } from './sidebar.actions';

export interface State {
  hasSidebar: boolean;
  opened: boolean;
  collapsible: boolean;
  title: string;
  mode: string;
  selectedModule: string;
}

const initialState: State = {
  hasSidebar: false,
  collapsible: true,
  opened: false,
  title: null,
  mode: 'side',
  selectedModule: null
};

export const sidebarReducer = produce<State, SidebarActions>(
  (draft, action) => {
    switch (action.type) {
      case SidebarActionTypes.Toggle:
        draft.opened = !draft.opened;
        break;
      case SidebarActionTypes.SetHasSidebar:
        draft.hasSidebar = action.payload;
        break;
      case SidebarActionTypes.SetMode:
        draft.mode = action.payload;
        break;
      case SidebarActionTypes.SetCollapsible:
        draft.collapsible = action.payload;
        break;
      case SidebarActionTypes.SetOpened:
        draft.opened = action.payload;
        break;
      case SidebarActionTypes.SetTitle:
        draft.title = action.payload;
        break;
      case SidebarActionTypes.SetSelectedModule:
        draft.selectedModule = action.payload;
        break;
    }
  },
  initialState
);
