import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';

export class HasLayertree {
  static readonly type = '[Layertree] Has Layertree';
  constructor(public payload: boolean) {}
}

export class SetLayertreeDisabled {
  static readonly type = '[Layertree] Set Layertree Disabled';
  constructor(public payload: boolean) {}
}

export class SetLayertreeTitle {
  static readonly type = '[Layertree] Set Layertree Title';
  constructor(public payload: string) {}
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
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.hasLayertree = action.payload;
      })
    );
  }
  @Action(SetLayertreeDisabled)
  setLayertreeDisabled(
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
  setLayertreeTitle(
    ctx: StateContext<LayertreeStateModel>,
    action: SetLayertreeTitle
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.title = action.payload;
      })
    );
  }
}
