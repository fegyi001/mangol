import { Action, State, StateContext } from '@ngxs/store';

export class HasLayertree {
  static readonly type = '[Layertree] Has Layertree';
  constructor(public hasLayertree: boolean) {}
}

export class SetLayertreeDisabled {
  static readonly type = '[Layertree] Set Layertree Disabled';
  constructor(public disabled: boolean) {}
}

export class SetLayertreeTitle {
  static readonly type = '[Layertree] Set Layertree Title';
  constructor(public title: string) {}
}

export interface LayertreeStateModel {
  hasLayertree: boolean;
  disabled: boolean;
  title: string;
}

@State<LayertreeStateModel>({
  name: 'layertree',
  defaults: {
    hasLayertree: false,
    disabled: false,
    title: 'Layertree'
  }
})
export class LayertreeState {
  @Action(HasLayertree)
  hasLayertree(ctx: StateContext<LayertreeStateModel>, action: HasLayertree) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      hasLayertree: action.hasLayertree
    });
  }
  @Action(SetLayertreeDisabled)
  setLayertreeDisabled(
    ctx: StateContext<LayertreeStateModel>,
    action: SetLayertreeDisabled
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      disabled: action.disabled
    });
  }
  @Action(SetLayertreeTitle)
  setLayertreeTitle(
    ctx: StateContext<LayertreeStateModel>,
    action: SetLayertreeTitle
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      title: action.title
    });
  }
}
