import produce from 'immer';

import { LayertreeActions, LayertreeActionTypes } from './layertree.actions';

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

export const layertreeReducer = produce<State, LayertreeActions>(
  (draft, action) => {
    switch (action.type) {
      case LayertreeActionTypes.HasLayertree:
        draft.hasLayertree = action.payload;
        break;
      case LayertreeActionTypes.SetDisabled:
        draft.disabled = action.payload;
        break;
      case LayertreeActionTypes.SetTitle:
        draft.title = action.payload;
        break;
      case LayertreeActionTypes.SetDictionary:
        draft.dictionary = action.payload;
        break;
      case LayertreeActionTypes.ShowLayergroupBadges:
        draft.showLayergroupBadges = action.payload;
        break;
    }
  },
  initialState
);
