import { Component, OnInit, Input } from '@angular/core';
import { MangolLayer } from '../../../../classes/Layer';

@Component({
  selector: 'mangol-featureinfo-results',
  templateUrl: './featureinfo-results.component.html',
  styleUrls: ['./featureinfo-results.component.scss']
})
export class FeatureinfoResultsComponent implements OnInit {
  @Input() layer: MangolLayer;

  constructor() {}

  ngOnInit() {}
}
