import BaseLayer from 'ol/layer/Base';
import Layer from 'ol/layer/Layer';

import { MangolLayerOptions } from './../interfaces/config-layers.inteface';

export class MangolLayer extends BaseLayer {
  public name: string;
  public layer: Layer;
  public details: string;
  public queryable: boolean;

  constructor(options: MangolLayerOptions) {
    super(options);
    this.name = options.name;
    this.layer = options.layer;
    this.details = options.details;
    this.queryable = options.queryable;
  }
}
