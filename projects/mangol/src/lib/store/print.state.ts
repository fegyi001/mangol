import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';

export class HasPrint {
  static readonly type = '[Print] Has Print';
  constructor(public payload: boolean) {}
}

export class SetPrintDisabled {
  static readonly type = '[Print] Set Print Disabled';
  constructor(public payload: boolean) {}
}

export class SetPrintTitle {
  static readonly type = '[Print] Set Print Title';
  constructor(public payload: string) {}
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
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.hasPrint = action.payload;
      })
    );
  }
  @Action(SetPrintDisabled)
  setPrintDisabled(
    ctx: StateContext<PrintStateModel>,
    action: SetPrintDisabled
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.disabled = action.payload;
      })
    );
  }
  @Action(SetPrintTitle)
  setPrintTitle(ctx: StateContext<PrintStateModel>, action: SetPrintTitle) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.title = action.payload;
      })
    );
  }
}
