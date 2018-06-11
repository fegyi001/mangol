import * as ol from 'openlayers';
import { State, Action, StateContext } from '@ngxs/store';

export class AddMap {
  static readonly type = '[Map] Add Map';
  constructor(public map: ol.Map) {}
}

export interface MapStateModel {
  map: ol.Map;
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
    const state = ctx.getState();
    ctx.setState({
      ...state,
      map: action.map
    });
  }
}
