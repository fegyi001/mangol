import * as ol from 'openlayers';

import {
  MangolConfigLayer,
  MangolConfigLayerColumn
} from '../interfaces/config-layers.inteface';
import { MangolMapService } from '../services/map.service';
import { MangolMap } from './map.class';

export class MangolLayer {
  map: MangolMap;
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
    map: MangolMap,
    options: MangolConfigLayer,
    private mapService: MangolMapService
  ) {
    this.map = map;
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
        this.mapService.addTile(this.map, evt.tile.getImage());
      });
      source.on('tileloadend', (evt: any) => {
        this.mapService.removeTile(this.map, evt.tile.getImage());
      });
      source.on('tileloaderror', (evt: any) => {
        this.mapService.removeTile(this.map, evt.tile.getImage());
      });
    } else if (
      source instanceof ol.source.ImageWMS ||
      source instanceof ol.source.ImageMapGuide ||
      source instanceof ol.source.ImageArcGISRest
    ) {
      source.on('imageloadstart', (evt: any) => {
        this.mapService.addTile(this.map, evt.image.getImage());
      });
      source.on('imageloadend', (evt: any) => {
        this.mapService.removeTile(this.map, evt.image.getImage());
      });
      source.on('imageloaderror', (evt: any) => {
        this.mapService.removeTile(this.map, evt.image.getImage());
      });
    }
  }

  getLayerVisibilityIcon() {
    return this.getVisible() ? 'visibility' : 'visibility_off';
  }

  toggleLayerVisibility() {
    this.setVisible(!this.getVisible());
  }

  getName(): string {
    return this.name;
  }

  getLayer(): any {
    return this.layer;
  }

  getOpacity(): number {
    return this.opacity;
  }

  setOpacity(value: number): void {
    this.opacity = value;
    this.layer.setOpacity(value);
  }

  getVisible(): boolean {
    return this.visible;
  }

  setVisible(value: boolean): void {
    this.visible = value;
    this.layer.setVisible(value);
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string) {
    this.description = description;
  }

  isQueryable(): boolean {
    return this.queryable;
  }

  setQueryable(queryable: boolean) {
    this.queryable = queryable;
  }

  getAttrColumns(): MangolConfigLayerColumn[] {
    return this.attrColumns;
  }

  setAttrColumns(cols: MangolConfigLayerColumn[]) {
    this.attrColumns = cols;
  }
}
