import * as SidebarActions from './sidebar.actions'

export interface State {
  hasSidebar: boolean
  opened: boolean
  collapsible: boolean
  title: string
  mode: string
  selectedModule: string
}

const initialState: State = {
  hasSidebar: false,
  collapsible: true,
  opened: false,
  title: null,
  mode: 'side',
  selectedModule: null
}

export function sidebarReducer(
  state = initialState,
  action: SidebarActions.SidebarActions
) {
  switch (action.type) {
    case SidebarActions.TOGGLE:
      return { ...state, opened: !state.opened }
    case SidebarActions.SET_HAS_SIDEBAR:
      return { ...state, hasSidebar: action.payload }
    case SidebarActions.SET_MODE:
      return { ...state, mode: action.payload }
    case SidebarActions.SET_COLLAPSIBLE:
      return { ...state, collapsible: action.payload }
    case SidebarActions.SET_OPENED:
      return { ...state, opened: action.payload }
    case SidebarActions.SET_TITLE:
      return { ...state, title: action.payload }
    case SidebarActions.SET_SELECTED_MODULE:
      return { ...state, selectedModule: action.payload }
    default:
      return state
  }
}
