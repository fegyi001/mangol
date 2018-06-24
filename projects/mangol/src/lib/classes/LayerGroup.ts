import { MangolLayerGroupOptions } from '../interfaces/config-layers.inteface';
import { MangolLayer } from './Layer';

export class MangolLayerGroup {
  public name: string;
  public details: string;
  public children: (MangolLayer | MangolLayerGroup)[];

  constructor(options: MangolLayerGroupOptions) {
    this.name = options.name;
    this.children = options.children;
    this.details = options.details;
  }
}
