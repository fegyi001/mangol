import { MangolMapService } from '../services/map.service';
import { MangolConfig } from './mangol-config.interface';
export interface MangolReady {
  config: MangolConfig,
  mapService: MangolMapService
}
