import { Action, State, StateContext } from '@ngxs/store';

export class HasPrint {
  static readonly type = '[Print] Has Print';
  constructor(public hasPrint: boolean) {}
}

export class SetPrintDisabled {
  static readonly type = '[Print] Set Print Disabled';
  constructor(public disabled: boolean) {}
}

export class SetPrintTitle {
  static readonly type = '[Print] Set Print Title';
  constructor(public title: string) {}
}

export interface PrintStateModel {
  hasPrint: boolean;
  disabled: boolean;
  title: string;
}

@State<PrintStateModel>({
  name: 'print',
  defaults: {
    hasPrint: false,
    disabled: false,
    title: 'Print'
  }
})
export class PrintState {
  @Action(HasPrint)
  hasPrint(ctx: StateContext<PrintStateModel>, action: HasPrint) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      hasPrint: action.hasPrint
    });
  }
  @Action(SetPrintDisabled)
  setPrintDisabled(
    ctx: StateContext<PrintStateModel>,
    action: SetPrintDisabled
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      disabled: action.disabled
    });
  }
  @Action(SetPrintTitle)
  setPrintTitle(ctx: StateContext<PrintStateModel>, action: SetPrintTitle) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      title: action.title
    });
  }
}
