import { MangolConfigLayer } from '../interfaces/mangol-config-layers.inteface';
export class MangolLayer {

  name: string;
  layer: any;
  opacity: number;
  visible: boolean;
  description: string;

  constructor(options: MangolConfigLayer) {
    this.name = options.name;
    this.layer = options.layer;
    const opacity = options.hasOwnProperty('opacity') ? options.opacity : 1.0;
    this.setOpacity(opacity);
    const visible = options.hasOwnProperty('visible') ? options.visible : true;
    this.setVisible(visible);
    const description = options.hasOwnProperty('description') ? options.description : null;
    this.setDescription(description);
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

}
