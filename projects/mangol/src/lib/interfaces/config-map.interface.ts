import Collection from 'ol/Collection'
import BaseLayer from 'ol/layer/Base'
import View from 'ol/View'

import { MangolLayer } from '../classes/Layer'
import { MangolLayerGroup } from '../classes/LayerGroup'
import { MangolConfigLayertree } from './config-layers.inteface'
import { MangolConfigMapControllers } from './config-map-controllers.interface'

export interface MangolConfigLayer2 extends BaseLayer {
  name: string
  description?: string
  queryable?: string
  attrcolumns?: any[]
}

export interface MangolConfigLayerGroup extends Collection<BaseLayer> {
  name: string
}

export interface MangolConfigMap {
  target: string
  view: View
  layertree?: MangolConfigLayertree
  controllers?: MangolConfigMapControllers
  layers?: (MangolLayer | MangolLayerGroup)[]
}
