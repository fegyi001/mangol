import * as ol from 'openlayers';
import { MangolLayer } from '../../../classes/Layer';

export class LayertreeItemNode {
  name: string;
  checked?: boolean;
  children?: LayertreeItemNode[];
  layer?: MangolLayer;
}
