import { MangolLayer } from './layer';
export class MangolLayergroup {

  name: string;
  children: any[];
  expanded: boolean;
  details: string;
  nestedLayers: MangolLayer[];
  nestedLayerGroups: MangolLayergroup[];

  constructor(options: any) {
    this.name = options.name;
    this.nestedLayers = [];
    this.nestedLayerGroups = [];
    this.expanded = options.hasOwnProperty('expanded') ? options.expanded : true;
    this.children = options.hasOwnProperty('children') ? options.children : [];
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.type === 'layer') {
        this.nestedLayers.push(new MangolLayer(child));
      } else if (child.type === 'layergroup') {
        this.nestedLayerGroups.push(new MangolLayergroup(child));
      }
    }
    this.details = this.getDetails();
  }

  getDetails(): string {
    const layerGroupLength = this.nestedLayerGroups.length;
    const layerLength = this.nestedLayers.length;
    const details: string[] = [];
    if (layerLength > 0) {
      details.push(`${layerLength} layer${layerLength === 1 ? '' : 's'}`);
    }
    if (layerGroupLength > 0) {
      details.push(`${layerGroupLength} layer group${layerGroupLength === 1 ? '' : 's'}`);
    }
    return details.join(', ');
  }

  public getName(): string {
    return this.name;
  }

  public getChildren(): any[] {
    return this.children;
  }

  public getExpanded(): boolean {
    return this.expanded;
  }

  public setExpanded(value: boolean): void {
    this.expanded = value;
  }

}
