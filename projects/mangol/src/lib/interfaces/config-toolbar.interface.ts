import { MeasureDictionary } from './../store/measure/measure.reducers';
import Style from 'ol/style/Style';

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

export interface MangolConfigPrintItem extends MangolConfigToolbarItem {}

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
