import { Component, OnInit, Input, HostBinding, ViewChild } from '@angular/core';

import { MangolLayer } from './../../core/_index';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'mangol-layer',
  templateUrl: './layer.component.html'
})
export class MangolLayerComponent implements OnInit {
  @HostBinding('class') class = 'mangol-layer';
  @ViewChild('end') sidenav: MatSidenav;

  @Input() layer: MangolLayer;

  fontIcon: string;
  detailsVisible: boolean;
  detailsHeight: string;

  constructor() {
    this.detailsVisible = false;
    this.detailsHeight = '100%';
  }

  public ngOnInit(): any {
    this.fontIcon = this.layer.getVisible() ? 'ms-tiles' : 'ms-tiles-o';
  }

  public showDetails(): void {
    this.sidenav.open();
  }

  public hideDetails(): void {
    this.sidenav.close();
  }

  public toggleVisibility(): any {
    this.layer.setVisible(!this.layer.getVisible());
    this.fontIcon = this.layer.getVisible() ? 'ms-tiles' : 'ms-tiles-o';
  }

  public onDetailsElementClicked(obj: any) {
    switch (obj.type) {
      case 'visibility':
        this.toggleVisibility();
        break;
    }
  }

}
