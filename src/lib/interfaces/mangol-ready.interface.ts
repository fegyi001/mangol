import { MangolMapService } from '../services/map.service';
import MangolConfig from './mangol-config.interface';
export default interface MangolReady {
  config: MangolConfig,
  mapService: MangolMapService
}
