import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';

import { MangolLayer } from './../classes/Layer';

export class HasFeatureinfo {
  static readonly type = '[Featureinfo] Has Featureinfo';
  constructor(public payload: boolean) {}
}

export class SetFeatureinfoDisabled {
  static readonly type = '[Featureinfo] Set Disabled';
  constructor(public payload: boolean) {}
}

export class SetFeatureinfoTitle {
  static readonly type = '[Featureinfo] Set Title';
  constructor(public payload: string) {}
}

export class SetFeatureinfoMaxFeatures {
  static readonly type = '[Featureinfo] Set Max Features';
  constructor(public payload: number) {}
}

export class SetFeatureinfoLayers {
  static readonly type = '[Featureinfo] Set Layers';
  constructor(public payload: MangolLayer[]) {}
}

export class SetFeatureinfoSelectedLayer {
  static readonly type = '[Featureinfo] Set Selected Layer';
  constructor(public payload: MangolLayer) {}
}

export class SetFeatureinfoResultsLayer {
  static readonly type = '[Featureinfo] Set Results Layer';
  constructor(public payload: VectorLayer) {}
}

export class SetFeatureinfoResultsItems {
  static readonly type = '[Featureinfo] Set Results Items';
  constructor(public payload: Feature[]) {}
}

export class SetFeatureinfoDictionary {
  static readonly type = '[Featureinfo] Set Dictionary';
  constructor(public payload: FeatureinfoDictionary) {}
}

export interface FeatureinfoDictionary {
  clearSelection?: string;
  chooseLayer?: string;
  clickOnMap?: string;
  noLayers?: string;
  numberOfFeaturesFound?: string;
  closeSnackbar?: string;
  showAllResults?: string;
}

export interface FeatureinfoStateModel {
  hasFeatureinfo: boolean;
  disabled: boolean;
  title: string;
  maxFeatures: number;
  layers: MangolLayer[];
  selectedLayer: MangolLayer;
  resultsLayer: VectorLayer;
  resultsItems: Feature[];
  snackbarDuration: number;
  dictionary: FeatureinfoDictionary;
}

@State<FeatureinfoStateModel>({
  name: 'featureinfo',
  defaults: {
    hasFeatureinfo: false,
    disabled: false,
    title: 'Select on Map',
    maxFeatures: 10,
    layers: [],
    selectedLayer: null,
    resultsLayer: null,
    resultsItems: [],
    snackbarDuration: 3000,
    dictionary: {
      clearSelection: 'Clear selection',
      chooseLayer: 'Choose a layer...',
      clickOnMap: 'Click on Map',
      noLayers: 'There are currently no queryable layers configured.',
      numberOfFeaturesFound: 'Number of features found',
      closeSnackbar: 'Close',
      showAllResults: 'Show All results'
    }
  }
})
export class FeatureinfoState {
  @Action(HasFeatureinfo)
  hasFeatureinfo(
    ctx: StateContext<FeatureinfoStateModel>,
    action: HasFeatureinfo
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.hasFeatureinfo = action.payload;
      })
    );
  }
  @Action(SetFeatureinfoDisabled)
  setFeatureinfoDisabled(
    ctx: StateContext<FeatureinfoStateModel>,
    action: SetFeatureinfoDisabled
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.disabled = action.payload;
      })
    );
  }
  @Action(SetFeatureinfoTitle)
  setFeatureinfoTitle(
    ctx: StateContext<FeatureinfoStateModel>,
    action: SetFeatureinfoTitle
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.title = action.payload;
      })
    );
  }
  @Action(SetFeatureinfoMaxFeatures)
  setMaxFeatures(
    ctx: StateContext<FeatureinfoStateModel>,
    action: SetFeatureinfoMaxFeatures
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.maxFeatures = action.payload;
      })
    );
  }
  @Action(SetFeatureinfoLayers)
  setFeatureinfoLayers(
    ctx: StateContext<FeatureinfoStateModel>,
    action: SetFeatureinfoLayers
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.layers = action.payload;
      })
    );
  }
  @Action(SetFeatureinfoSelectedLayer)
  setSelectedLayer(
    ctx: StateContext<FeatureinfoStateModel>,
    action: SetFeatureinfoSelectedLayer
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.selectedLayer = action.payload;
      })
    );
  }
  @Action(SetFeatureinfoResultsLayer)
  setResultsLayer(
    ctx: StateContext<FeatureinfoStateModel>,
    action: SetFeatureinfoResultsLayer
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.resultsLayer = action.payload;
      })
    );
  }
  @Action(SetFeatureinfoResultsItems)
  setResultsItems(
    ctx: StateContext<FeatureinfoStateModel>,
    action: SetFeatureinfoResultsItems
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.resultsItems = action.payload;
      })
    );
  }
  @Action(SetFeatureinfoDictionary)
  setDictionary(
    ctx: StateContext<FeatureinfoStateModel>,
    action: SetFeatureinfoDictionary
  ) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.dictionary = action.payload;
      })
    );
  }
}
