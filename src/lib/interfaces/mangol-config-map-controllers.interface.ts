export interface MangolConfigMapControllerMousePosition {
  precision?: number
}

export interface MangolConfigMapControllerScaleLine {
  units?: string
}

export interface MangolConfigMapControllers {
  mousePosition?: MangolConfigMapControllerMousePosition,
  scaleLine?: MangolConfigMapControllerScaleLine
}
