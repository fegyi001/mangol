import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';
export class HasMeasure {
  static readonly type = '[Measure] Has Measure';
  constructor(public payload: boolean) {}
}

export class SetMeasureDisabled {
  static readonly type = '[Measure] Set Measure Disabled';
  constructor(public payload: boolean) {}
}

export class SetMeasureTitle {
  static readonly type = '[Measure] Set Measure Title';
  constructor(public payload: string) {}
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
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.hasMeasure = action.payload;
      })
    );
  }
  @Action(SetMeasureDisabled)
  setMeasureDisabled(
    ctx: StateContext<MeasureStateModel>,
    action: SetMeasureDisabled
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.disabled = action.payload;
      })
    );
  }
  @Action(SetMeasureTitle)
  setMeasureTitle(
    ctx: StateContext<MeasureStateModel>,
    action: SetMeasureTitle
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.title = action.payload;
      })
    );
  }
}
