import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import VectorLayer from 'ol/layer/Vector';

import { CursorMode } from './../interfaces/cursor-mode';

export class SetCursorMode {
  static readonly type = '[Cursor] Set Mode';
  constructor(public payload: CursorMode) {}
}

export class ResetCursorMode {
  static readonly type = '[Cursor] Reset Mode';
  constructor() {}
}

export class SetCursorVisible {
  static readonly type = '[Cursor] Set Visible';
  constructor(public payload: boolean) {}
}

export class SetCursorLayer {
  static readonly type = '[Cursor] Set Layer';
  constructor(public payload: VectorLayer) {}
}

export interface CursorStateModel {
  mode: CursorMode;
  visible: boolean;
  layer: VectorLayer;
}

@State<CursorStateModel>({
  name: 'cursor',
  defaults: {
    mode: { text: null, cursor: 'default' },
    visible: false,
    layer: null
  }
})
export class CursorState {
  @Action(SetCursorMode)
  setMode(ctx: StateContext<CursorStateModel>, action: SetCursorMode) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.mode = action.payload;
      })
    );
  }
  @Action(ResetCursorMode)
  resetMode(ctx: StateContext<CursorStateModel>, action: ResetCursorMode) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.mode = { text: null, cursor: 'default' } as CursorMode;
      })
    );
  }
  @Action(SetCursorVisible)
  setVisible(ctx: StateContext<CursorStateModel>, action: SetCursorVisible) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.visible = action.payload;
      })
    );
  }
  @Action(SetCursorLayer)
  setLayer(ctx: StateContext<CursorStateModel>, action: SetCursorLayer) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.layer = action.payload;
      })
    );
  }
}
