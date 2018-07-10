import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';

import { MangolConfig } from './../interfaces/config.interface';

export class SetConfig {
  static readonly type = '[Config] Set Config';
  constructor(public payload: MangolConfig) {}
}

export interface ConfigStateModel {
  config: MangolConfig;
}

@State<ConfigStateModel>({
  name: 'config',
  defaults: {
    config: null
  }
})
export class ConfigState {
  @Action(SetConfig)
  setConfig(ctx: StateContext<ConfigStateModel>, action: SetConfig) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.config = action.payload;
      })
    );
  }
}
