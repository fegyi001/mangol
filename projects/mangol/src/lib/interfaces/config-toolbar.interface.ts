import { MangolConfigToolbarItem } from './config-toolbar.interface';

import * as ol from 'openlayers';
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
  cursorStyle?: string;
  fillColor?: [number, number, number, number];
  strokeColor?: [number, number, number, number];
  textColor?: [number, number, number, number];
  textOutlineColor?: [number, number, number, number];
  font?: string;
}

export interface MangolConfigPrintItem extends MangolConfigToolbarItem {}

export interface MangolConfigFeatureInfoItem extends MangolConfigToolbarItem {
  maxFeatures?: number;
  cursorStyle?: string;
  placeholder?: string;
  zoomOnRowClick?: boolean;
  highlightFeatures?: boolean;
  hoverStyle?: ol.style.Style[];
}

export interface MangolConfigToolbar {
  layertree?: MangolConfigLayertreeItem;
  measure?: MangolConfigMeasureItem;
  print?: MangolConfigPrintItem;
  featureinfo?: MangolConfigFeatureInfoItem;
}
