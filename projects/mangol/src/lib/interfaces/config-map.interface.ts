import { MangolLayer } from './../classes/Layer';
import { MangolConfigLayer2 } from './config-map.interface';
import { MangolConfigView } from './config-view.interface';
import { MangolConfigLayertree } from './config-layers.inteface';
import { MangolConfigMapControllers } from './config-map-controllers.interface';
import { MangolLayerGroup } from '../classes/LayerGroup';

export interface MangolConfigMapMousePosition {}

export interface MangolConfigLayer2 extends ol.layer.Base {
  name: string;
  description?: string;
  queryable?: string;
  attrcolumns?: any[];
}

export interface MangolConfigLayerGroup extends ol.Collection<ol.layer.Base> {
  name: string;
}

export interface MangolConfigMap {
  target: string;
  view: ol.View;
  layertree?: MangolConfigLayertree;
  renderer?: string;
  controllers?: MangolConfigMapControllers;
  layers?: (MangolLayer | MangolLayerGroup)[];
}
