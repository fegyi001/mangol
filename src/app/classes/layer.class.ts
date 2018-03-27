import * as ol from 'openlayers';

import {
  MangolConfigLayer,
  MangolConfigLayerColumn
} from '../interfaces/config-layers.inteface';
import { MangolMapService } from '../services/map.service';

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

  constructor(
    options: MangolConfigLayer,
    private mapService: MangolMapService
  ) {
    this.name = options.name;
    this.showDetails = false;
    this.layer = options.layer;
    this.setOpacity(options.hasOwnProperty('opacity') ? options.opacity : 1.0);
    this.setVisible(options.hasOwnProperty('visible') ? options.visible : true);
    this.setDescription(
      options.hasOwnProperty('description') ? options.description : null
    );
    this.setQueryable(
      options.hasOwnProperty('queryable') ? options.queryable : false
    );
    this.setAttrColumns(
      options.hasOwnProperty('attrColumns') ? options.attrColumns : []
    );
    this._configureTileLoad();
  }

  private _configureTileLoad() {
    const source = this.layer.getSource();
    if (
      source instanceof ol.source.TileWMS ||
      source instanceof ol.source.OSM ||
      source instanceof ol.source.BingMaps ||
      source instanceof ol.source.TileArcGISRest ||
      source instanceof ol.source.TileImage ||
      source instanceof ol.source.TileJSON
    ) {
      source.on('tileloadstart', (evt: any) => {
        this.mapService.addTile(evt.tile.getImage());
      });
      source.on('tileloadend', (evt: any) => {
        this.mapService.removeTile(evt.tile.getImage());
      });
      source.on('tileloaderror', (evt: any) => {
        this.mapService.removeTile(evt.tile.getImage());
      });
    } else if (
      source instanceof ol.source.ImageWMS ||
      source instanceof ol.source.ImageMapGuide ||
      source instanceof ol.source.ImageArcGISRest
    ) {
      source.on('imageloadstart', (evt: any) => {
        this.mapService.addTile(evt.image.getImage());
      });
      source.on('imageloadend', (evt: any) => {
        this.mapService.removeTile(evt.image.getImage());
      });
      source.on('imageloaderror', (evt: any) => {
        this.mapService.removeTile(evt.image.getImage());
      });
    }
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
