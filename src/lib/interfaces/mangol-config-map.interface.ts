import { MangolConfigView } from './mangol-config-view.interface';
import { MangolConfigLayertree } from './mangol-config-layers.inteface';
import { MangolConfigMapControllers } from './mangol-config-map-controllers.interface';

export interface MangolConfigMapMousePosition {

}

export interface MangolConfigMap {
  target: string,
  view: MangolConfigView,
  layertree?: MangolConfigLayertree,
  renderer?: string,
  controllers?: MangolConfigMapControllers
}
