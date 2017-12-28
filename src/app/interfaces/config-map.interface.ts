import { MangolConfigView } from './config-view.interface';
import { MangolConfigLayertree } from './config-layers.inteface';
import { MangolConfigMapControllers } from './config-map-controllers.interface';

export interface MangolConfigMapMousePosition {

}

export interface MangolConfigMap {
  target: string;
  view: MangolConfigView;
  layertree?: MangolConfigLayertree;
  renderer?: string;
  controllers?: MangolConfigMapControllers;
}
