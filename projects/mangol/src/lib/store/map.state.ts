import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import Map from 'ol/Map';

export class AddMap {
  static readonly type = '[Map] Add Map';
  constructor(public map: Map) {}
}

export interface MapStateModel {
  map: Map;
  version: number;
}

@State<MapStateModel>({
  name: 'map',
  defaults: {
    map: null,
    version: 0
  }
})
export class MapState {
  @Action(AddMap)
  addMap(ctx: StateContext<MapStateModel>, action: AddMap) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.map = action.map;
        draft.version = draft.version + 1;
      })
    );
  }
}
