import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { MangolLayer, MangolLayergroup, MangolMap } from './../../../core/_index';

@Component({
  selector: 'mangol-layertree',
  templateUrl: './layertree.component.html'
})
export class MangolLayertreeComponent implements OnInit {
  @HostBinding('class') class = 'mangol-layertree';

  @Input() map: MangolMap;
  layerGroups: MangolLayergroup[];
  layers: MangolLayer[];

  public ngOnInit(): any {
    this.layerGroups = this.map.getMangolLayerGroups();
    this.layers = this.map.getMangolLayers();
  }

}
