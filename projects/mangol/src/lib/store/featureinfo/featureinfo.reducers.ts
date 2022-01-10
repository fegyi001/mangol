import Feature from 'ol/Feature'
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'
import Polygon from 'ol/geom/Polygon'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

import { MangolLayer } from '../../classes/Layer'
import * as FeatureinfoActions from './featureinfo.actions'

export interface FeatureinfoDictionary {
  clearSelection?: string
  chooseLayer?: string
  clickOnMap?: string
  noLayers?: string
  numberOfFeaturesFound?: string
  closeSnackbar?: string
  zoomToFeature?: string
  showAllResults?: string
  feature?: string
  exportToCsv?: string
}

export interface State {
  hasFeatureinfo: boolean
  disabled: boolean
  title: string
  maxFeatures: number
  layers: MangolLayer[]
  selectedLayer: MangolLayer
  resultsLayer: VectorLayer<VectorSource<LineString | Polygon | Point>>
  resultsItems: Feature<LineString | Polygon | Point>[]
  snackbarDuration: number
  hoverColor: [number, number, number]
  dictionary: FeatureinfoDictionary
}

const initialState: State = {
  hasFeatureinfo: false,
  disabled: false,
  title: 'Select on Map',
  maxFeatures: 10,
  layers: [],
  selectedLayer: null,
  resultsLayer: null,
  resultsItems: [],
  snackbarDuration: 3000,
  hoverColor: [255, 255, 0],
  dictionary: {
    clearSelection: 'Clear selection',
    chooseLayer: 'Choose a layer...',
    clickOnMap: 'Click on Map',
    noLayers: 'There are currently no queryable layers configured.',
    numberOfFeaturesFound: 'Number of features found',
    closeSnackbar: 'Close',
    zoomToFeature: 'Zoom to Feature',
    showAllResults: 'Open results dialog',
    feature: 'Feature',
    exportToCsv: 'Export to CSV'
  }
}

export function featureinfoReducer(
  state = initialState,
  action: FeatureinfoActions.FeatureinfoActions
) {
  switch (action.type) {
    case FeatureinfoActions.HAS_FEATUREINFO:
      return { ...state, hasFeatureinfo: action.payload }
    case FeatureinfoActions.SET_DISABLED:
      return { ...state, disabled: action.payload }
    case FeatureinfoActions.SET_TITLE:
      return { ...state, title: action.payload }
    case FeatureinfoActions.SET_MAX_FEATURES:
      return { ...state, maxFeatures: action.payload }
    case FeatureinfoActions.SET_LAYERS:
      return { ...state, layers: action.payload }
    case FeatureinfoActions.SET_SELECTED_LAYER:
      return { ...state, selectedLayer: action.payload }
    case FeatureinfoActions.SET_RESULTS_LAYER:
      return { ...state, resultsLayer: action.payload }
    case FeatureinfoActions.SET_RESULTS_ITEMS:
      return { ...state, resultsItems: action.payload }
    case FeatureinfoActions.SET_DICTIONARY:
      return { ...state, dictionary: action.payload }
    case FeatureinfoActions.SET_HOVER_COLOR:
      return { ...state, hoverColor: action.payload }
    default:
      return state
  }
}
