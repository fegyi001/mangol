import { MangolLayer, MangolLayergroup } from '../index';

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

    public addLayersAndLayerGroups(optionLayers: any[]): any {
        for (let i = 0; i < optionLayers.length; i++) {
            let element = optionLayers[i];
            this.handleLayerOrLayerGroup(element, null);
        }
    }

    private handleLayerOrLayerGroup(element: any, layerGroup: MangolLayergroup): any {
        if (element.type === 'layer') {
            let newLayer = new MangolLayer(element);
            this.addLayer(element.layer);
            if (layerGroup !== null) {
                layerGroup.getChildren().push(newLayer);
            } else {
                this.layers.push(newLayer);
            }
        } else if (element.type === 'layergroup') {
            let newLayerGroup = new MangolLayergroup(element);
            this.layerGroups.push(newLayerGroup);
            for (let i = 0; i < element.children.length; i++) {
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
