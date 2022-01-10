import { PrintDictionary } from '../../interfaces/config-toolbar.interface'
import * as PrintActions from './print.actions'

export interface PrintLayout {
  type: 'landscape' | 'portrait'
}

export interface PrintSize {
  id: string
  width: number
  height: number
}

export interface State {
  hasPrint: boolean
  disabled: boolean
  title: string
  layouts: PrintLayout[]
  resolutions: number[]
  sizes: PrintSize[]
  selectedLayout: PrintLayout
  selectedResolution: number
  selectedSize: PrintSize
  dictionary: PrintDictionary
}

const initialState: State = {
  hasPrint: false,
  disabled: false,
  title: 'Print',
  resolutions: [72, 100, 150, 300],
  sizes: [
    { id: 'A5', width: 210, height: 148 },
    { id: 'A4', width: 297, height: 210 },
    { id: 'A3', width: 420, height: 297 },
    { id: 'A2', width: 594, height: 420 },
    { id: 'A1', width: 841, height: 594 },
    { id: 'A0', width: 1189, height: 841 }
  ],
  layouts: [
    {
      type: 'landscape'
    },
    {
      type: 'portrait'
    }
  ],
  selectedLayout: null,
  selectedResolution: null,
  selectedSize: null,
  dictionary: {
    print: 'Print',
    layout: 'Layout',
    size: 'Size',
    resolution: 'Resolution',
    landscape: 'Landscape',
    portrait: 'Portrait',
    clearSelection: 'Clear'
  }
}

export function printReducer(
  state = initialState,
  action: PrintActions.PrintActions
) {
  switch (action.type) {
    case PrintActions.HAS_PRINT:
      return { ...state, hasPrint: action.payload }
    case PrintActions.SET_DISABLED:
      return { ...state, disabled: action.payload }
    case PrintActions.SET_TITLE:
      return { ...state, title: action.payload }
    case PrintActions.SET_RESOLUTIONS:
      return { ...state, resolutions: action.payload }
    case PrintActions.SET_LAYOUTS:
      return { ...state, layouts: action.payload }
    case PrintActions.SET_SIZES:
      return { ...state, sizes: action.payload }
    case PrintActions.SET_DICTIONARY:
      const dict = { ...state.dictionary }
      for (const key in action.payload) {
        if (action.payload.hasOwnProperty(key)) {
          dict[key] = action.payload[key]
        }
      }
      return { ...state, dictionary: dict }
    case PrintActions.SET_SELECTED_LAYOUT:
      return { ...state, selectedLayout: action.payload }
    case PrintActions.SET_SELECTED_RESOLUTION:
      return { ...state, selectedResolution: action.payload }
    case PrintActions.SET_SELECTED_SIZE:
      return { ...state, selectedSize: action.payload }
    default:
      return state
  }
}
