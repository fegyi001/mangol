import * as ol from 'openlayers';

export class LayertreeItemNode {
  name: string;
  checked?: boolean;
  children?: LayertreeItemNode[];
  layer?: ol.layer.Layer;
}
