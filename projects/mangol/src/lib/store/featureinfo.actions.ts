import { Action, State, StateContext } from '@ngxs/store';

export class HasFeatureinfo {
  static readonly type = '[Featureinfo] Has Featureinfo';
  constructor(public hasFeatureinfo: boolean) {}
}

export class SetFeatureinfoDisabled {
  static readonly type = '[Featureinfo] Set Featureinfo Disabled';
  constructor(public disabled: boolean) {}
}

export class SetFeatureinfoTitle {
  static readonly type = '[Featureinfo] Set Featureinfo Title';
  constructor(public title: string) {}
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
    const state = ctx.getState();
    ctx.setState({
      ...state,
      hasFeatureinfo: action.hasFeatureinfo
    });
  }
  @Action(SetFeatureinfoDisabled)
  setFeatureinfoDisabled(
    ctx: StateContext<FeatureinfoStateModel>,
    action: SetFeatureinfoDisabled
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      disabled: action.disabled
    });
  }
  @Action(SetFeatureinfoTitle)
  setFeatureinfoTitle(
    ctx: StateContext<FeatureinfoStateModel>,
    action: SetFeatureinfoTitle
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      title: action.title
    });
  }
}
