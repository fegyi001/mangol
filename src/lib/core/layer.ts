import { MangolConfigLayer, MangolConfigLayerColumn } from '../interfaces/mangol-config-layers.inteface';
export class MangolLayer {

  name: string;
  layer: any;
  opacity: number;
  visible: boolean;
  description: string;
  showDetails: boolean;
  detailType: string;
  queryable: boolean;
  attrColumns: MangolConfigLayerColumn[];

  constructor(options: MangolConfigLayer) {
    this.name = options.name;
    this.showDetails = false;
    this.layer = options.layer;
    this.setOpacity(options.hasOwnProperty('opacity') ? options.opacity : 1.0);
    this.setVisible(options.hasOwnProperty('visible') ? options.visible : true);
    this.setDescription(options.hasOwnProperty('description') ? options.description : null);
    this.setQueryable(options.hasOwnProperty('queryable') ? options.queryable : false);
    this.setAttrColumns(options.hasOwnProperty('attrColumns') ? options.attrColumns : []);
  }

  public getLayerVisibilityIcon() {
    return this.getVisible() ? 'visibility' : 'visibility_off';
  }

  public toggleLayerVisibility() {
    this.setVisible(!this.getVisible());
  }

  public getName(): string {
    return this.name;
  }

  public getLayer(): any {
    return this.layer;
  }

  public getOpacity(): number {
    return this.opacity;
  }

  public setOpacity(value: number): void {
    this.opacity = value;
    this.layer.setOpacity(value);
  }

  public getVisible(): boolean {
    return this.visible;
  }

  public setVisible(value: boolean): void {
    this.visible = value;
    this.layer.setVisible(value);
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public isQueryable(): boolean {
    return this.queryable;
  }

  public setQueryable(queryable: boolean) {
    this.queryable = queryable;
  }

  public getAttrColumns(): MangolConfigLayerColumn[] {
    return this.attrColumns;
  }

  public setAttrColumns(cols: MangolConfigLayerColumn[]) {
    this.attrColumns = cols;
  }

}
