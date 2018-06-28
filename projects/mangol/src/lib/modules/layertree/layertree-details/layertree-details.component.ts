import { Component, Input, OnInit } from '@angular/core';

import { MangolLayer } from './../../../classes/Layer';

@Component({
  selector: 'mangol-layertree-details',
  templateUrl: './layertree-details.component.html',
  styleUrls: ['./layertree-details.component.scss']
})
export class LayertreeDetailsComponent implements OnInit {
  @Input() layer: MangolLayer;

  hasDetails = false;
  constructor() {}

  ngOnInit() {
    console.log(this.layer);
    this.hasDetails =
      typeof this.layer.details !== 'undefined' &&
      this.layer.hasOwnProperty('details') &&
      this.layer.details !== null &&
      this.layer.details.length > 0;
  }
}
