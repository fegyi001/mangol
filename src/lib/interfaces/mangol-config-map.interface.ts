import { MangolConfigView } from './mangol-config-view.interface';
import { MangolConfigLayerItem } from './mangol-config-layers.inteface';
export interface MangolConfigMap {
  target: string,
  view: MangolConfigView,
  layers: MangolConfigLayerItem[],
  renderer?: string
}
