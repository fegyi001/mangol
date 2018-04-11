import { Component, HostBinding, Input, OnInit } from '@angular/core';

import { MangolLayergroup } from '../../classes/layergroup.class';
import { MangolMap } from '../../classes/map.class';
import { MangolLayer } from './../../classes/layer.class';
import { MangolConfigLayertreeItem } from './../../interfaces/config-toolbar.interface';

@Component({
  selector: 'mangol-layertree',
  templateUrl: './layertree.component.html'
})
export class MangolLayertreeComponent implements OnInit {
  @HostBinding('class') class = 'mangol-layertree';

  @Input() opts: MangolConfigLayertreeItem;
  @Input() map: MangolMap;
  @Input() isAccordionMulti: boolean;
  layerGroups: MangolLayergroup[];
  layers: MangolLayer[];

  ngOnInit() {
    this.layerGroups = this.map.getMangolLayerGroups();
    this.layers = this.map.getMangolLayers();
  }

  setMenuActive(type: string, layer: MangolLayer) {
    layer.detailType = type;
    layer.showDetails = true;
  }

  hideDetails(layer: MangolLayer) {
    layer.detailType = null;
    layer.showDetails = false;
  }
}
