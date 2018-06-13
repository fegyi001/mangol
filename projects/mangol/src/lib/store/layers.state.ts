// import { Action, State, StateContext } from '@ngxs/store';

// export class AddLayerGroup {
//   static readonly type = '[LAYERS] Add Layer Group';
//   constructor(public group: MangolConfigLayerGroup) {}
// }

// export interface ConfigStateModel {
//   config: MangolConfig;
// }

// @State<ConfigStateModel>({
//   name: 'config',
//   defaults: {
//     config: null
//   }
// })
// export class ConfigState {
//   @Action(SetConfig)
//   setConfig(ctx: StateContext<ConfigStateModel>, action: SetConfig) {
//     const state = ctx.getState();
//     ctx.setState({
//       ...state,
//       config: action.config
//     });
//   }
// }
