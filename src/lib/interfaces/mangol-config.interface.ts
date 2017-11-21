import { MangolConfigMap } from './mangol-config-map.interface';
import { MangolConfigSidebar } from './mangol-config-sidebar.interface';

export default interface MangolConfig {
  map?: MangolConfigMap,
  sidebar?: MangolConfigSidebar
}
