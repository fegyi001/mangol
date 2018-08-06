import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';

export class HasLayertree {
  static readonly type = '[Layertree] Has Layertree';
  constructor(public payload: boolean) {}
}

export class SetLayertreeDisabled {
  static readonly type = '[Layertree] Set Disabled';
  constructor(public payload: boolean) {}
}

export class SetLayertreeTitle {
  static readonly type = '[Layertree] Set Title';
  constructor(public payload: string) {}
}

export class SetLayertreeDictionary {
  static readonly type = '[Layertree] Set Dictionary';
  constructor(public payload: LayertreeDictionary) {}
}

export class LayertreeShowLayergroupBadges {
  static readonly type = '[Layertree] Show Layergroup Badges';
  constructor(public payload: boolean) {}
}

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

export interface LayertreeStateModel {
  hasLayertree: boolean;
  disabled: boolean;
  title: string;
  showLayergroupBadges: boolean;
  dictionary: LayertreeDictionary;
}

@State<LayertreeStateModel>({
  name: 'layertree',
  defaults: {
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
  }
})
export class LayertreeState {
  @Action(HasLayertree)
  hasLayertree(ctx: StateContext<LayertreeStateModel>, action: HasLayertree) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.hasLayertree = action.payload;
      })
    );
  }
  @Action(SetLayertreeDisabled)
  setDisabled(
    ctx: StateContext<LayertreeStateModel>,
    action: SetLayertreeDisabled
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.disabled = action.payload;
      })
    );
  }
  @Action(SetLayertreeTitle)
  setTitle(ctx: StateContext<LayertreeStateModel>, action: SetLayertreeTitle) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.title = action.payload;
      })
    );
  }
  @Action(LayertreeShowLayergroupBadges)
  showLayergroupBadges(
    ctx: StateContext<LayertreeStateModel>,
    action: LayertreeShowLayergroupBadges
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.showLayergroupBadges = action.payload;
      })
    );
  }
}
