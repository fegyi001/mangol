import { MangolLayer } from './layer.class';
import { MangolConfigLayerGroup, MangolConfigLayer } from '../interfaces/config-layers.inteface';
export class MangolLayergroup {

  options: MangolConfigLayerGroup;
  name: string;
  details: string;
  nestedLayers: MangolLayer[];
  nestedLayerGroups: MangolLayergroup[];

  constructor(options: MangolConfigLayerGroup) {
    this.options = options;
    this.name = options.name;
    this.nestedLayers = [];
    this.nestedLayerGroups = [];
  }

  public getDetails(): void {
    if (this.options.hasOwnProperty('description')) {
      this.details = this.options.description;
    } else {
      const layerGroupLength = this.nestedLayerGroups.length;
      const layerLength = this.nestedLayers.length;
      const details: string[] = [];
      if (layerLength > 0) {
        details.push(`${layerLength} layer${layerLength === 1 ? '' : 's'}`);
      }
      if (layerGroupLength > 0) {
        details.push(`${layerGroupLength} layer group${layerGroupLength === 1 ? '' : 's'}`);
      }
      this.details = details.join(', ');
    }
  }

  public getName(): string {
    return this.name;
  }

}
