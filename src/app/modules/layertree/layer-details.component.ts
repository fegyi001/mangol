import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { MatSliderChange } from '@angular/material';

import { MangolConfigToolbarLayertreeDetails } from '../../interfaces/config-toolbar.interface';
import { MangolLayer } from './../../classes/layer.class';

@Component({
  selector: 'mangol-layer-details',
  templateUrl: './layer-details.component.html'
})
export class MangolLayerDetailsComponent implements OnInit {
  @HostBinding('class') class = 'mangol-layer-details';

  @Input() opts: MangolConfigToolbarLayertreeDetails;
  @Input() layer: MangolLayer;
  @Input() detailType: string;
  @Output() detailsClosed = new EventEmitter<any>();

  sliderMin: number;
  sliderMax: number;
  sliderStep: number;
  sliderShowLabels: boolean;
  sliderValue: number;

  ngOnInit() {
    this.sliderMin = 0;
    this.sliderMax = 100;
    this.sliderValue = parseInt((this.layer.opacity * 100).toString(), 0);
    this.sliderStep =
      this.opts &&
      this.opts.hasOwnProperty('opacity') &&
      this.opts.opacity.hasOwnProperty('sliderStep')
        ? this.opts.opacity.sliderStep
        : 1;
    this.sliderShowLabels =
      this.opts &&
      this.opts.hasOwnProperty('opacity') &&
      this.opts.opacity.hasOwnProperty('showLabels')
        ? this.opts.opacity.showLabels
        : true;
  }

  onSliderChange($event: MatSliderChange) {
    const newValue = $event.value / 100;
    this.layer.opacity = newValue;
    this.layer.layer.setOpacity(newValue);
    this.sliderValue = parseInt((this.layer.opacity * 100).toString(), 0);
  }

  closeDetails() {
    this.detailsClosed.emit(null);
  }
}
