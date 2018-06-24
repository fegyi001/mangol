import * as ol from 'openlayers';

import { MangolLayerOptions } from './../interfaces/config-layers.inteface';

export class MangolLayer extends ol.layer.Base {
  public name: string;
  public layer: ol.layer.Layer;
  public details: string;

  constructor(options: MangolLayerOptions) {
    super(options);
    this.name = options.name;
    this.layer = options.layer;
    this.details = options.details;
  }
}
