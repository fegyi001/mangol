export interface MangolConfigLayerColumn {
  name: string,
  label?: string
}

export interface MangolConfigLayer {
  name: string,
  layer: any,
  visible?: boolean,
  opacity?: number
  description?: string,
  queryable?: boolean,
  attrColumns?: MangolConfigLayerColumn[]
}

export interface MangolConfigLayerGroup {
  name: string,
  description?: string,
  children: MangolConfigLayertree
}

export interface MangolConfigLayertree {
  layers?: MangolConfigLayer[],
  groups?: MangolConfigLayerGroup[],
}
