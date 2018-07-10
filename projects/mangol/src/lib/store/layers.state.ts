import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';

import { MangolLayer } from '../classes/Layer';

export class AddLayers {
  static readonly type = '[LAYERS] Add Layers';
  constructor(public payload: MangolLayer[]) {}
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
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.layers = action.payload;
      })
    );
  }
}
