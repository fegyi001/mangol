export interface MangolConfigLayer {
  type: string,
  name: string,
  layer: any,
  visible?: boolean,
  opacity?: number
  description?: string,
}

export interface MangolConfigLayerGroup {
  type: string,
  name: string,
  expanded?: boolean,
  children: MangolConfigLayer[]
}

export type MangolConfigLayerItem = MangolConfigLayer | MangolConfigLayerGroup;
