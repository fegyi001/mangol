export interface MangolControllersOptions {
  show: boolean
}

export interface MangolControllersZoomDictionary {
  zoomIn?: string
  zoomOut?: string
}

export interface MangolControllersZoomOptions extends MangolControllersOptions {
  dictionary?: MangolControllersZoomDictionary
  showTooltip?: boolean
}

export type MangolControllersScalebarOptions = MangolControllersOptions

export interface MangolControllersFullScreenDictionary {
  maximize?: string
  minimize?: string
}

export interface MangolControllersFullScreenOptions
  extends MangolControllersOptions {
  dictionary?: MangolControllersFullScreenDictionary
  showTooltip?: boolean
}

export interface MangolControllersPositionDictionary {
  textCopied?: string
  copyCoordinates?: string
  closeSnackbar?: string
}

export interface MangolControllersPositionOptions
  extends MangolControllersOptions {
  precision?: number
  dictionary?: MangolControllersPositionDictionary
}

export type MangolControllersTileloadOptions = MangolControllersOptions

export interface MangolControllersRotationDictionary {
  rotateToNorth?: string
}

export interface MangolControllersRotationOptions
  extends MangolControllersOptions {
  dictionary?: MangolControllersRotationDictionary
  showTooltip?: boolean
}

export interface MangolConfigMapControllers {
  zoom?: MangolControllersZoomOptions
  scalebar?: MangolControllersScalebarOptions
  position?: MangolControllersPositionOptions
  tileload?: MangolControllersTileloadOptions
  rotation?: MangolControllersRotationOptions
  fullScreen?: MangolControllersFullScreenOptions
}
