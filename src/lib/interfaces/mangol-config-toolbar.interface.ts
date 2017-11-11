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

export interface MangolConfigToolbar {
  layertree?: MangolConfigLayertreeItem,
  measure?: MangolConfigMeasureItem,
  print?: MangolConfigPrintItem
}
