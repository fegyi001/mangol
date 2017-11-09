import { MangolConfigView } from './mangol-config-view.interface';
import { MangolConfigLayertreeItem } from './mangol-config-layers.inteface';
export interface MangolConfigMap {
  target: string,
  view: MangolConfigView,
  layertree?: MangolConfigLayertreeItem,
  renderer?: string
}
