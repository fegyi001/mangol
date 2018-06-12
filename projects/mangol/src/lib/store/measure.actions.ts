import { Action, State, StateContext } from '@ngxs/store';

export class HasMeasure {
  static readonly type = '[Measure] Has Measure';
  constructor(public hasMeasure: boolean) {}
}

export class SetMeasureDisabled {
  static readonly type = '[Measure] Set Measure Disabled';
  constructor(public disabled: boolean) {}
}

export class SetMeasureTitle {
  static readonly type = '[Measure] Set Measure Title';
  constructor(public title: string) {}
}

export interface MeasureStateModel {
  hasMeasure: boolean;
  disabled: boolean;
  title: string;
}

@State<MeasureStateModel>({
  name: 'measure',
  defaults: {
    hasMeasure: false,
    disabled: false,
    title: 'Measure'
  }
})
export class MeasureState {
  @Action(HasMeasure)
  hasMeasure(ctx: StateContext<MeasureStateModel>, action: HasMeasure) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      hasMeasure: action.hasMeasure
    });
  }
  @Action(SetMeasureDisabled)
  setMeasureDisabled(
    ctx: StateContext<MeasureStateModel>,
    action: SetMeasureDisabled
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      disabled: action.disabled
    });
  }
  @Action(SetMeasureTitle)
  setMeasureTitle(
    ctx: StateContext<MeasureStateModel>,
    action: SetMeasureTitle
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      title: action.title
    });
  }
}
