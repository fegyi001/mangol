import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import Map from 'ol/Map';

export class AddMap {
  static readonly type = '[Map] Add Map';
  constructor(public payload: Map) {}
}

export interface MapStateModel {
  map: Map;
}

@State<MapStateModel>({
  name: 'map',
  defaults: {
    map: null
  }
})
export class MapState {
  @Action(AddMap)
  addMap(ctx: StateContext<MapStateModel>, action: AddMap) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.map = action.payload;
      })
    );
  }
}
