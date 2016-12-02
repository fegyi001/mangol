import { Component, Input, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'mangol-container',
  template: `
  <div class="mangol-container">
  
    <mangol-map *ngIf="config.map" 
                [options]="config"
                (mapCreated)="mapCreated($event)"
                (sidebarToggled)="sidebarToggled($event)"></mangol-map>
  </div>
  `,
  styleUrls: ['./container.component.scss']
})
export class MangolContainerComponent implements OnInit {

  // @HostBinding('class') class = 'mangol-container';

  @Input() config: any;
  map: ol.Map;
  isOpened: boolean;

  public ngOnInit(): any {
    try {
      this.isOpened = this.config.sidebar.opened;
    } catch (error) {
      this.isOpened = true;
    }
  }

  public mapCreated(map: ol.Map): void {
    this.map = map;
    this.map.updateSize();
  }

  public sidebarToggled(): void {
    this.isOpened = !this.isOpened;
  }

  public updateMap(): void {
    this.map.updateSize();
  }

}
