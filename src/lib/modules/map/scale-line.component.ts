import { HostBinding, OnInit, Component, Input, AfterViewInit } from '@angular/core';
import { MangolMap } from '../../core/map';
import { MangolConfigMapControllerScaleLine } from '../../interfaces/mangol-config-map-controllers.interface';

import * as ol from 'openlayers';

@Component({
  selector: 'mangol-scale-line',
  templateUrl: './scale-line.component.html'
})
export class MangolScaleLineComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'mangol-scale-line';

  @Input() map: MangolMap;
  @Input() opts: MangolConfigMapControllerScaleLine

  target: string;

  constructor() {
  }

  ngOnInit() {
    this.target = this.map.getTarget() + '-scale-line';
  }

  ngAfterViewInit() {
    const scaleLineControl = new ol.control.ScaleLine({
      target: document.getElementById(this.target),
      units: this.opts.hasOwnProperty('units') ? this.opts.units : 'metric'
    });
    setTimeout(() => {
      this.map.addControl(scaleLineControl);
    }, 0);
  }

}
