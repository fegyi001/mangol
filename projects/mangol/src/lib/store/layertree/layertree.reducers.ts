import * as LayertreeActions from './layertree.actions';

export interface LayertreeDictionary {
  groups?: string;
  layers?: string;
  expandAll?: string;
  collapseAll?: string;
  turnLayersOn?: string;
  turnLayersOff?: string;
  showLayerTransparency?: string;
  showLayerDescription?: string;
}

export interface State {
  hasLayertree: boolean;
  disabled: boolean;
  title: string;
  showLayergroupBadges: boolean;
  dictionary: LayertreeDictionary;
}

const initialState: State = {
  hasLayertree: false,
  disabled: false,
  title: 'Layertree',
  showLayergroupBadges: true,
  dictionary: {
    groups: 'Groups',
    layers: 'Layers',
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    turnLayersOn: 'Turn layers on',
    turnLayersOff: 'Turn layers off',
    showLayerTransparency: 'Transparency',
    showLayerDescription: 'Layer description'
  }
};

export function layertreeReducer(
  state = initialState,
  action: LayertreeActions.LayertreeActions
) {
  switch (action.type) {
    case LayertreeActions.HAS_LAYERTREE:
      return { ...state, hasLayertree: action.payload };
    case LayertreeActions.SET_DISABLED:
      return { ...state, disabled: action.payload };
    case LayertreeActions.SET_TITLE:
      return { ...state, title: action.payload };
    case LayertreeActions.SET_DICTIONARY:
      return { ...state, dictionary: action.payload };
    case LayertreeActions.SHOW_LAYERGROUP_BADGES:
      return { ...state, showLayergroupBadges: action.payload };
    default:
      return state;
  }
}
