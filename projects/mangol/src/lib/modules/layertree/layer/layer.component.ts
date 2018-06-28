import { MangolLayer } from './../../../classes/Layer';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mangol-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss']
})
export class LayerComponent implements OnInit {
  @Input() layer: MangolLayer;

  constructor() {}

  ngOnInit() {}
}
