import { Component, OnInit, Input, Output, HostBinding, EventEmitter } from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { MangolLayer } from '../../core/layer';

@Component({
  selector: 'mangol-layer-details',
  templateUrl: './layer-details.component.html'
})
export class MangolLayerDetailsComponent implements OnInit {
  @HostBinding('class') class = 'mangol-layer-details';

  @Input() layer: MangolLayer;
  @Input() detailType: string;
  @Output() detailsClosed = new EventEmitter<any>();

  sliderMin: number;
  sliderMax: number;
  sliderStep: number;

  public ngOnInit(): any {
    this.sliderMin = 0;
    this.sliderMax = 100;
    this.sliderStep = 5;
  }

  public onSliderChange($event: MatSliderChange) {
    const newValue = $event.value / 100;
    this.layer.opacity = newValue;
    this.layer.layer.setOpacity(newValue);
  }

  public closeDetails() {
    this.detailsClosed.emit(null);
  }
}
