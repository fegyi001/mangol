import { MangolConfig } from '../../interfaces/config.interface'
import * as ConfigActions from './config.actions'

export interface State {
  config: MangolConfig
}

const initialState: State = {
  config: null
}

export function configReducer(
  state = initialState,
  action: ConfigActions.ConfigActions
) {
  switch (action.type) {
    case ConfigActions.SET_CONFIG:
      return { ...state, config: action.payload }
    default:
      return state
  }
}
