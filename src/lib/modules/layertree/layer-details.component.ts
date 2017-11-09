import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { MangolLayer } from '../../core/layer';

@Component({
  selector: 'mangol-layer-details',
  templateUrl: './layer-details.component.html'
})
export class MangolLayerDetailsComponent implements OnInit {
  @HostBinding('class') class = 'mangol-layer-details';

  @Input() layer: MangolLayer;
  @Input() detailType: string;

  public ngOnInit(): any {

  }

}
