import { MangolLayerGroup } from './../classes/LayerGroup';
import * as ol from 'openlayers';
import { MangolLayer } from '../classes/Layer';
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
  source?: ol.source.Source;
  visible?: boolean;
  extent?: ol.Extent;
  zIndex?: number;
  minResolution?: number;
  maxResolution?: number;
}

export interface MangolLayerOptions extends OlxLayerLayerOptions {
  name: string;
  layer: ol.layer.Layer;
  details?: string;
}

export interface OlxLayerGroupOptions {
  opacity?: number;
  visible?: boolean;
  extent?: ol.Extent;
  zIndex?: number;
  minResolution?: number;
  maxResolution?: number;
  layers?: ol.layer.Base[] | ol.Collection<ol.layer.Base>;
}

export interface MangolLayerGroupOptions extends OlxLayerGroupOptions {
  name: string;
  details?: string;
  children: (MangolLayer | MangolLayerGroup)[];
}
