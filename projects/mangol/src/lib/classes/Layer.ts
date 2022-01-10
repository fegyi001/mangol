import LineString from 'ol/geom/LineString'
import MultiLineString from 'ol/geom/MultiLineString'
import MultiPoint from 'ol/geom/MultiPoint'
import MultiPolygon from 'ol/geom/MultiPolygon'
import Point from 'ol/geom/Point'
import Polygon from 'ol/geom/Polygon'
import BaseLayer from 'ol/layer/Base'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import TileImage from 'ol/source/TileImage'
import TileWMS from 'ol/source/TileWMS'
import VectorSource from 'ol/source/Vector'

import { MangolLayerOptions } from './../interfaces/config-layers.inteface'

export class MangolLayer extends BaseLayer {
  public name: string
  public layer:
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
  public details: string
  public queryable: boolean
  public querySrs: string
  public queryIdProperty: string
  public queryColumns: string[]

  constructor(options: MangolLayerOptions) {
    super(options)
    this.name = options.name
    this.layer = options.layer
    this.details = options.details
    this.queryable = options.queryable
    this.querySrs = options.querySrs
    this.queryIdProperty = options.queryIdProperty
    this.queryColumns = options.queryColumns
  }
}
