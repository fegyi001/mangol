export interface MangolControllersOptions {
  show: boolean;
}

export interface MangolControllersZoomDictionary {
  zoomIn?: string;
  zoomOut?: string;
}

export interface MangolControllersZoomOptions extends MangolControllersOptions {
  dictionary?: MangolControllersZoomDictionary;
  showTooltip?: boolean;
}

export interface MangolControllersScalebarOptions
  extends MangolControllersOptions {}

export interface MangolControllersPositionDictionary {
  textCopied?: string;
  copyCoordinates?: string;
  closeSnackbar?: string;
}

export interface MangolControllersPositionOptions
  extends MangolControllersOptions {
  precision?: number;
  dictionary?: MangolControllersPositionDictionary;
}

export interface MangolControllersTileloadOptions
  extends MangolControllersOptions {}

export interface MangolControllersRotationDictionary {
  rotateToNorth?: string;
}

export interface MangolControllersRotationOptions
  extends MangolControllersOptions {
  dictionary?: MangolControllersRotationDictionary;
  showTooltip?: boolean;
}

export interface MangolConfigMapControllers {
  zoom?: MangolControllersZoomOptions;
  scalebar?: MangolControllersScalebarOptions;
  position?: MangolControllersPositionOptions;
  tileload?: MangolControllersTileloadOptions;
  rotation?: MangolControllersRotationOptions;
}
