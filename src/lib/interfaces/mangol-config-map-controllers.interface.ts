export interface MangolConfigMapControllerMousePosition {
  precision?: number
}

export interface MangolConfigMapControllerScaleLine {
  units?: string
}
export interface MangolConfigMapControllerQuickSearchItem {
  text: string,
  details?: string,
  coordinates?: [number, number],
  extent?: [number, number, number, number]
}
export interface MangolConfigMapControllerQuickSearch {
  placeholder?: string,
  items: MangolConfigMapControllerQuickSearchItem[]
}

export interface MangolConfigMapControllerFullScreen {

}

export interface MangolConfigMapControllers {
  mousePosition?: MangolConfigMapControllerMousePosition,
  scaleLine?: MangolConfigMapControllerScaleLine,
  quickSearch?: MangolConfigMapControllerQuickSearch,
  fullScreen?: MangolConfigMapControllerFullScreen
}
