import { Action, State, StateContext } from '@ngxs/store';

import { MangolConfig } from './../interfaces/config.interface';

export class SetConfig {
  static readonly type = '[Config] Set Config';
  constructor(public config: MangolConfig) {}
}

export interface ConfigStateModel {
  config: MangolConfig;
}

@State<ConfigStateModel>({
  name: 'config',
  defaults: {
    config: {}
  }
})
export class ConfigState {
  @Action(SetConfig)
  setConfig(ctx: StateContext<ConfigStateModel>, action: SetConfig) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      config: action.config
    });
  }
}
