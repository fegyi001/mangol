import { Action } from '@ngrx/store';
import { MangolConfig } from '../../interfaces/config.interface';

export const SET_CONFIG = '[Config] Set Config';

export class SetConfig implements Action {
  readonly type = SET_CONFIG;
  constructor(public payload: MangolConfig) {}
}

export type ConfigActions = SetConfig;
