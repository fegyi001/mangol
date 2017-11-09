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
  children: MangolConfigLayertreeItem
}

export interface MangolConfigLayertreeItem {
  layers?: MangolConfigLayer[],
  groups?: MangolConfigLayerGroup[]
}
