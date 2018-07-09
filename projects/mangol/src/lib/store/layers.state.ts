import { Action, State, StateContext } from '@ngxs/store';
import { MangolLayer } from '../classes/Layer';

export class AddLayers {
  static readonly type = '[LAYERS] Add Layers';
  constructor(public layers: MangolLayer[]) {}
}

export interface LayersStateModel {
  layers: MangolLayer[];
}

@State<LayersStateModel>({
  name: 'layers',
  defaults: {
    layers: []
  }
})
export class LayersState {
  @Action(AddLayers)
  addLayers(ctx: StateContext<LayersStateModel>, action: AddLayers) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      layers: action.layers
    });
  }
}
