import { MangolConfigView } from './mangol-config-view.interface';
import { MangolConfigLayertreeItem } from './mangol-config-layers.inteface';
import { MangolConfigMapControllers } from './mangol-config-map-controllers.interface';

export interface MangolConfigMapMousePosition {

}

export interface MangolConfigMap {
  target: string,
  view: MangolConfigView,
  layertree?: MangolConfigLayertreeItem,
  renderer?: string,
  controllers?: MangolConfigMapControllers
}
