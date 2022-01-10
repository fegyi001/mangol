import LineString from 'ol/geom/LineString'
import MultiLineString from 'ol/geom/MultiLineString'
import MultiPoint from 'ol/geom/MultiPoint'
import MultiPolygon from 'ol/geom/MultiPolygon'
import Point from 'ol/geom/Point'
import Polygon from 'ol/geom/Polygon'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import Source from 'ol/source/Source'
import TileImage from 'ol/source/TileImage'
import TileWMS from 'ol/source/TileWMS'
import VectorSource from 'ol/source/Vector'

import { MangolLayer } from '../classes/Layer'
import { MangolLayerGroup } from './../classes/LayerGroup'

export interface MangolConfigLayerColumn {
  name: string
  label?: string
}

export interface MangolConfigLayer {
  name: string
  layer: any
  visible?: boolean
  opacity?: number
  description?: string
  queryable?: boolean
  attrColumns?: MangolConfigLayerColumn[]
}

export interface MangolConfigLayerGroup {
  name: string
  description?: string
  children: MangolConfigLayertree
}

export interface MangolConfigLayertree {
  layers?: MangolConfigLayer[]
  groups?: MangolConfigLayerGroup[]
}

export interface OlxLayerLayerOptions {
  opacity?: number
  source?: Source
  visible?: boolean
  extent?: [number, number, number, number]
  zIndex?: number
  minResolution?: number
  maxResolution?: number
}

export interface MangolLayerOptions extends OlxLayerLayerOptions {
  name: string
  layer:
    | VectorLayer<
        VectorSource<
          | Point
          | LineString
          | Polygon
          | MultiLineString
          | MultiPoint
          | MultiPolygon
        >
      >
    | TileLayer<TileWMS | TileImage>
  details?: string
  queryable?: boolean
  querySrs?: string
  queryIdProperty?: string
  queryColumns?: string[]
}

export interface MangolLayerGroupOptions {
  name: string
  details?: string
  children: (MangolLayer | MangolLayerGroup)[]
}
