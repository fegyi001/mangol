import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { MangolLayer } from '../../core/layer';
import { MangolMap } from '../../core/map';
import { MangolLayergroup } from '../../core/layergroup';

@Component({
  selector: 'mangol-layertree',
  templateUrl: './layertree.component.html'
})
export class MangolLayertreeComponent implements OnInit {
  @HostBinding('class') class = 'mangol-layertree';

  @Input() map: MangolMap;
  @Input() isAccordionMulti: boolean;
  layerGroups: MangolLayergroup[];
  layers: MangolLayer[];

  public ngOnInit(): any {
    this.layerGroups = this.map.getMangolLayerGroups();
    this.layers = this.map.getMangolLayers();
  }

  setMenuActive(type: string, layer: MangolLayer) {
    layer.detailType = type;
    layer.showDetails = true;
  };

  hideDetails(layer: MangolLayer) {
    layer.detailType = null;
    layer.showDetails = false;
  }

}
