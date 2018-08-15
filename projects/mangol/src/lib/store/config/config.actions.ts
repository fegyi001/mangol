import { Action } from '@ngrx/store';
import { MangolConfig } from '../../interfaces/config.interface';

export enum ConfigActionTypes {
  SetConfig = '[Config] Set Config'
}

export class SetConfig implements Action {
  readonly type = ConfigActionTypes.SetConfig;
  constructor(public payload: MangolConfig) {}
}

export type ConfigActions = SetConfig;
