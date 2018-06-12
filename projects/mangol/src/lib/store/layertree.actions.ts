import { Action, State, StateContext } from '@ngxs/store';
import { MangolConfigLayertreeItem } from '../interfaces/config-toolbar.interface';

export class HasLayertree {
  static readonly type = '[Layertree] Has Layertree';
  constructor(public hasLayertree: boolean) {}
}

export class SetLayertreeDisabled {
  static readonly type = '[Layertree] Set Layertree Disabled';
  constructor(public disabled: boolean) {}
}

export class SetLayertreeFontSet {
  static readonly type = '[Layertree] Set Layertree Font Set';
  constructor(public fontSet: string) {}
}

export class SetLayertreeFontIcon {
  static readonly type = '[Layertree] Set Layertree Font Icon';
  constructor(public fontIcon: string) {}
}

export class SetLayertreeTitle {
  static readonly type = '[Layertree] Set Layertree Title';
  constructor(public title: string) {}
}

export interface LayertreeStateModel {
  hasLayertree: boolean;
  disabled: boolean;
  fontSet: string;
  fontIcon: string;
  title: string;
}

@State<LayertreeStateModel>({
  name: 'layertree',
  defaults: {
    hasLayertree: false,
    disabled: false,
    fontSet: 'ms',
    fontIcon: 'ms-layers',
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
  @Action(SetLayertreeFontSet)
  setLayertreeFontSet(
    ctx: StateContext<LayertreeStateModel>,
    action: SetLayertreeFontSet
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      fontSet: action.fontSet
    });
  }
  @Action(SetLayertreeFontIcon)
  setLayertreeFontIcon(
    ctx: StateContext<LayertreeStateModel>,
    action: SetLayertreeFontIcon
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      fontIcon: action.fontIcon
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
