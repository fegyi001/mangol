import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';

import {
  MangolControllersPositionOptions,
  MangolControllersScalebarOptions,
  MangolControllersZoomDictionary,
  MangolControllersZoomOptions
} from '../interfaces/config-map-controllers.interface';

export class ControllersReset {
  static readonly type = '[Controllers] Reset';
  constructor() {}
}

export class ControllersSetShowZoom {
  static readonly type = '[Controllers] Set Show Zoom';
  constructor(public payload: boolean) {}
}

export class ControllersSetZoomDictionary {
  static readonly type = '[Controllers] Set Zoom Dictionary';
  constructor(public payload: MangolControllersZoomDictionary) {}
}

export class ControllersSetShowTooltip {
  static readonly type = '[Controllers] Set Show Tooltip';
  constructor(public payload: boolean) {}
}

export class ControllersSetScalebar {
  static readonly type = '[Controllers] Set Scalebar';
  constructor(public payload: MangolControllersScalebarOptions) {}
}

export class ControllersSetShowPosition {
  static readonly type = '[Controllers] Set Show Position';
  constructor(public payload: boolean) {}
}

export class ControllersSetPositionPrecision {
  static readonly type = '[Controllers] Set Position Precision';
  constructor(public payload: number) {}
}

export class ControllersSetPositionCoordinates {
  static readonly type = '[Controllers] Set Position Coordinates';
  constructor(public payload: [number, number]) {}
}

export interface MangolControllersPositionStateModel
  extends MangolControllersPositionOptions {
  coordinates: number[];
}

export interface ControllersStateModel {
  zoom: MangolControllersZoomOptions;
  scalebar: MangolControllersScalebarOptions;
  position: MangolControllersPositionStateModel;
}

const controllersStateDefaults: ControllersStateModel = {
  zoom: {
    show: false,
    dictionary: {
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out'
    },
    showTooltip: true
  },
  scalebar: { show: false },
  position: { show: false, coordinates: [], precision: 2 }
};

@State<ControllersStateModel>({
  name: 'controllers',
  defaults: controllersStateDefaults
})
export class ControllersState {
  @Action(ControllersReset)
  reset(ctx: StateContext<ControllersStateModel>) {
    ctx.setState(controllersStateDefaults);
  }
  @Action(ControllersSetShowZoom)
  setShowZoom(
    ctx: StateContext<ControllersStateModel>,
    action: ControllersSetShowZoom
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.zoom.show = action.payload;
      })
    );
  }
  @Action(ControllersSetZoomDictionary)
  setZoomDictionary(
    ctx: StateContext<ControllersStateModel>,
    action: ControllersSetZoomDictionary
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.zoom.dictionary = action.payload;
      })
    );
  }
  @Action(ControllersSetShowTooltip)
  setTooltip(
    ctx: StateContext<ControllersStateModel>,
    action: ControllersSetShowTooltip
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.zoom.showTooltip = action.payload;
      })
    );
  }
  @Action(ControllersSetShowPosition)
  setShowPosition(
    ctx: StateContext<ControllersStateModel>,
    action: ControllersSetShowPosition
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.position.show = action.payload;
      })
    );
  }
  @Action(ControllersSetPositionPrecision)
  setPositionPrecision(
    ctx: StateContext<ControllersStateModel>,
    action: ControllersSetPositionPrecision
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.position.precision = action.payload;
      })
    );
  }
  @Action(ControllersSetPositionCoordinates)
  setPositionCoordinates(
    ctx: StateContext<ControllersStateModel>,
    action: ControllersSetPositionCoordinates
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.position.coordinates = action.payload;
      })
    );
  }
}
