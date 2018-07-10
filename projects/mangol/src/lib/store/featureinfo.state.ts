import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';

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

export interface FeatureinfoStateModel {
  hasFeatureinfo: boolean;
  disabled: boolean;
  title: string;
}

@State<FeatureinfoStateModel>({
  name: 'featureinfo',
  defaults: {
    hasFeatureinfo: false,
    disabled: false,
    title: 'Select on Map'
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
}
