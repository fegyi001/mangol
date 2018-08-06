import Layer from 'ol/layer/Layer';
import Source from 'ol/source/Source';

import { MangolLayer } from '../classes/Layer';
import { MangolLayerGroup } from './../classes/LayerGroup';

export interface MangolConfigLayerColumn {
  name: string;
  label?: string;
}

export interface MangolConfigLayer {
  name: string;
  layer: any;
  visible?: boolean;
  opacity?: number;
  description?: string;
  queryable?: boolean;
  attrColumns?: MangolConfigLayerColumn[];
}

export interface MangolConfigLayerGroup {
  name: string;
  description?: string;
  children: MangolConfigLayertree;
}

export interface MangolConfigLayertree {
  layers?: MangolConfigLayer[];
  groups?: MangolConfigLayerGroup[];
}

export interface OlxLayerLayerOptions {
  opacity?: number;
  source?: Source;
  visible?: boolean;
  extent?: [number, number, number, number];
  zIndex?: number;
  minResolution?: number;
  maxResolution?: number;
}

export interface MangolLayerOptions extends OlxLayerLayerOptions {
  name: string;
  layer: Layer;
  details?: string;
  queryable?: boolean;
  querySrs?: string;
}

export interface MangolLayerGroupOptions {
  name: string;
  details?: string;
  children: (MangolLayer | MangolLayerGroup)[];
}
