import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { MangolLayer } from 'mangol/lib/classes/Layer';

export class HasFeatureinfo {
  static readonly type = '[Featureinfo] Has Featureinfo';
  constructor(public payload: boolean) {}
}

export class SetFeatureinfoDisabled {
  static readonly type = '[Featureinfo] Set Featureinfo Disabled';
  constructor(public payload: boolean) {}
}

export class SetFeatureinfoTitle {
  static readonly type = '[Featureinfo] Set Featureinfo Title';
  constructor(public payload: string) {}
}

export class SetFeatureinfoLayers {
  static readonly type = '[Featureinfo] Set Featureinfo Layers';
  constructor(public payload: MangolLayer[]) {}
}

export interface FeatureinfoStateModel {
  hasFeatureinfo: boolean;
  disabled: boolean;
  title: string;
  layers: MangolLayer[];
}

@State<FeatureinfoStateModel>({
  name: 'featureinfo',
  defaults: {
    hasFeatureinfo: false,
    disabled: false,
    title: 'Select on Map',
    layers: []
  }
})
export class FeatureinfoState {
  @Action(HasFeatureinfo)
  hasFeatureinfo(
    ctx: StateContext<FeatureinfoStateModel>,
    action: HasFeatureinfo
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.hasFeatureinfo = action.payload;
      })
    );
  }
  @Action(SetFeatureinfoDisabled)
  setFeatureinfoDisabled(
    ctx: StateContext<FeatureinfoStateModel>,
    action: SetFeatureinfoDisabled
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.disabled = action.payload;
      })
    );
  }
  @Action(SetFeatureinfoTitle)
  setFeatureinfoTitle(
    ctx: StateContext<FeatureinfoStateModel>,
    action: SetFeatureinfoTitle
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.title = action.payload;
      })
    );
  }
  @Action(SetFeatureinfoLayers)
  setFeatureinfoLayers(
    ctx: StateContext<FeatureinfoStateModel>,
    action: SetFeatureinfoLayers
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.layers = action.payload;
      })
    );
  }
}
