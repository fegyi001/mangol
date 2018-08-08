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
export interface MangolControllersPositionOptions
  extends MangolControllersOptions {
  precision?: number;
}
export interface MangolControllersTileloadOptions
  extends MangolControllersOptions {}

export interface MangolConfigMapControllers {
  zoom?: MangolControllersZoomOptions;
  scalebar?: MangolControllersScalebarOptions;
  position?: MangolControllersPositionOptions;
  tileload?: MangolControllersTileloadOptions;
}
