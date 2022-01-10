import { MangolConfigMap } from './config-map.interface'
import { MangolConfigSidebar } from './config-sidebar.interface'

export interface MangolConfig {
  map?: MangolConfigMap
  sidebar?: MangolConfigSidebar
}
