export interface MangolConfigToolbarItem {
  title?: string,
  fontSet?: string,
  fontIcon?: string,
  active?: boolean,
  disabled?: boolean
}

export interface MangolConfigToolbar {
  layertree?: MangolConfigToolbarItem,
  measure?: MangolConfigToolbarItem,
  print?: MangolConfigToolbarItem
}
