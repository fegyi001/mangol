import { MangolConfigToolbarItem } from './mangol-config-toolbar.interface';
export interface MangolConfigToolbarItem {
  title?: string,
  fontSet?: string,
  fontIcon?: string,
  active?: boolean,
  disabled?: boolean
}

export interface MangolConfigToolbarLayertreeDetails {
  opacity?: {
    sliderStep?: number,
    showLabels?: boolean
  },
  legend?: any
}

export interface MangolConfigLayertreeItem extends MangolConfigToolbarItem {
  isAccordionMulti?: boolean,
  details?: MangolConfigToolbarLayertreeDetails
}

export interface MangolConfigMeasureItem extends MangolConfigToolbarItem {

}

export interface MangolConfigPrintItem extends MangolConfigToolbarItem {

}

export interface MangolConfigFeatureInfoItem extends MangolConfigToolbarItem {
  maxFeatures?: number,
  cursorStyle?: string,
  placeholder?: string
}

export interface MangolConfigToolbar {
  layertree?: MangolConfigLayertreeItem,
  measure?: MangolConfigMeasureItem,
  print?: MangolConfigPrintItem,
  featureinfo?: MangolConfigFeatureInfoItem
}
