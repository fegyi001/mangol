export interface MangolConfigLayer {
  name: string,
  layer: any,
  visible?: boolean,
  opacity?: number
  description?: string
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
