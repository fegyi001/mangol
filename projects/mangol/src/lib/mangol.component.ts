import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as ol from 'openlayers';

@Component({
  selector: 'mangol',
  templateUrl: './mangol.component.html',
  styleUrls: ['./mangol.component.scss']
})
export class MangolComponent implements OnInit {
  @Input() config: any;
  sidebarOpened = false;
  sidebarMode: string;

  constructor(private store: Store) {}

  ngOnInit() {
    this.sidebarOpened = true;
    this.sidebarMode = 'side';

    console.log(this.config);
  }

  onOpenedChange(evt: boolean) {
    if (this.sidebarMode === 'side') {
      this.store.selectOnce(state => state.map.map).subscribe((m: ol.Map) => {
        m.updateSize();
      });
    }
  }
}
