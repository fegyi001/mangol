import GeometryType from 'ol/geom/GeometryType'

import * as MeasureActions from './measure.actions'

export interface MeasureMode {
  type: string
  fontIcon: string
  fontSet: string
  //TODO: GeometryType
  geometryName: any
}

export interface MeasureDictionary {
  clearSelection?: string
  chooseMode?: string
  clickOnMap?: string
  closeSnackbar?: string
  line?: string
  area?: string
  radius?: string
  distance?: string
  angle?: string
  drawStartText?: string
  drawStartTextRadius?: string
}
export interface State {
  hasMeasure: boolean
  disabled: boolean
  title: string
  modes: MeasureMode[]
  mode: MeasureMode
  dictionary: MeasureDictionary
}

const initialState: State = {
  hasMeasure: false,
  disabled: false,
  title: 'Measure',
  modes: [
    {
      type: 'line',
      fontSet: 'ms',
      fontIcon: 'ms-measure-distance',
      geometryName: GeometryType.LINE_STRING
    },
    {
      type: 'area',
      fontSet: 'ms',
      fontIcon: 'ms-measure-area',
      geometryName: GeometryType.POLYGON
    },
    {
      type: 'radius',
      fontSet: 'ms',
      fontIcon: 'ms-geolocation',
      geometryName: GeometryType.CIRCLE
    }
  ],
  mode: null,
  dictionary: {
    clearSelection: 'Clear selection',
    chooseMode: 'Choose measure mode...',
    clickOnMap: 'Click on Map to start measurement',
    closeSnackbar: 'Close',
    line: 'Line',
    area: 'Area',
    radius: 'Radius',
    distance: 'Distance',
    angle: 'angle',
    drawStartText:
      'Insert new vertex with single click,\nfinish measurement with double click',
    drawStartTextRadius: 'Finish measurement with single click'
  }
}

export function measureReducer(
  state = initialState,
  action: MeasureActions.MeasureActions
) {
  switch (action.type) {
    case MeasureActions.HAS_MEASURE:
      return { ...state, hasMeasure: action.payload }
    case MeasureActions.SET_DISABLED:
      return { ...state, disabled: action.payload }
    case MeasureActions.SET_TITLE:
      return { ...state, title: action.payload }
    case MeasureActions.SET_DICTIONARY:
      const dict = { ...state.dictionary }
      for (const key in action.payload) {
        if (action.payload.hasOwnProperty(key)) {
          dict[key] = action.payload[key]
        }
      }
      return { ...state, dictionary: dict }
    case MeasureActions.SET_MODE:
      return { ...state, mode: action.payload }
    default:
      return state
  }
}
