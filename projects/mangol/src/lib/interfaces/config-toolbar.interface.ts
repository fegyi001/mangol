import Style from 'ol/style/Style';

import { PrintLayout } from '../store/print/print.reducers';
import { MeasureDictionary } from './../store/measure/measure.reducers';
import { PrintSize } from './../store/print/print.reducers';

export interface MangolConfigToolbarItem {
  title?: string;
  active?: boolean;
  disabled?: boolean;
  type?: string;
}

export interface MangolConfigToolbarLayertreeDetails {
  opacity?: {
    sliderStep?: number;
    showLabels?: boolean;
  };
  legend?: any;
}

export interface MangolConfigLayertreeItem extends MangolConfigToolbarItem {
  isAccordionMulti?: boolean;
  details?: MangolConfigToolbarLayertreeDetails;
}

export interface MangolConfigMeasureItem extends MangolConfigToolbarItem {
  precision?: number;
  fillColor?: [number, number, number, number];
  strokeColor?: [number, number, number, number];
  textColor?: [number, number, number, number];
  textOutlineColor?: [number, number, number, number];
  font?: string;
  dictionary?: MeasureDictionary;
}

export interface PrintDictionary {
  print?: string;
  layout?: string;
  size?: string;
  resolution?: string;
  portrait?: string;
  landscape?: string;
  clearSelection?: string;
}

export interface MangolConfigPrintItem extends MangolConfigToolbarItem {
  resolutions?: number[];
  sizes?: PrintSize[];
  layouts?: PrintLayout[];
  dictionary?: PrintDictionary;
}

export interface MangolConfigFeatureInfoItem extends MangolConfigToolbarItem {
  maxFeatures?: number;
  cursorStyle?: string;
  placeholder?: string;
  zoomOnRowClick?: boolean;
  highlightFeatures?: boolean;
  hoverStyle?: Style[];
}

export interface MangolConfigToolbar {
  layertree?: MangolConfigLayertreeItem;
  measure?: MangolConfigMeasureItem;
  print?: MangolConfigPrintItem;
  featureinfo?: MangolConfigFeatureInfoItem;
}
