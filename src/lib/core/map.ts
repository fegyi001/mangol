
import * as ol from 'openlayers';
import { MangolLayer } from './layer';
import { MangolLayergroup } from './layergroup';

export class MangolMap extends ol.Map {

  options: any;

  layers: MangolLayer[];
  layerGroups: MangolLayergroup[];

  constructor(options: any) {
    super(options);
    this.options = options;
    this.layers = [];
    this.layerGroups = [];
  }

  public addLayersAndLayerGroups(optionLayers: any[]): void {
    for (let i = 0; i < optionLayers.length; i++) {
      const element = optionLayers[i];
      this.handleLayerOrLayerGroup(element, null);
    }
  }

  private handleLayerOrLayerGroup(element: any, layerGroup: MangolLayergroup): void {
    if (element.type === 'layer') {
      const newLayer = new MangolLayer(element);
      this.addLayer(element.layer);
      if (layerGroup !== null) {
        layerGroup.getChildren().push(newLayer);
      } else {
        this.layers.push(newLayer);
      }
    } else if (element.type === 'layergroup') {
      const newLayerGroup = new MangolLayergroup(element);
      this.layerGroups.push(newLayerGroup);
      for (let i = 0; i < element.children.length; i++) {
        // find subgroup children and subgroups recursively
        this.handleLayerOrLayerGroup(element.children[i], newLayerGroup);
      }
    }
  }

  public getMangolLayers(): MangolLayer[] {
    return this.layers;
  }

  public getMangolLayerGroups(): MangolLayergroup[] {
    return this.layerGroups;
  }

}
