import { Observable } from 'rxjs/Observable';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as ol from 'openlayers';
import { ToggleSidebar } from './store/sidebar.actions';

@Component({
  selector: 'mangol',
  templateUrl: './mangol.component.html',
  styleUrls: ['./mangol.component.scss']
})
export class MangolComponent implements OnInit {
  @Input() config: any;
  sidebarOpened$: Observable<boolean>;
  sidebarMode: string;

  constructor(private store: Store) {
    this.sidebarOpened$ = this.store.select(state => state.sidebar.opened);
  }

  ngOnInit() {
    this.sidebarMode = 'side';
    if (
      this.config.hasOwnProperty('sidebar') &&
      this.config.sidebar.hasOwnProperty('opened')
    ) {
      this.store.selectOnce(state => state.sidebar.opened).subscribe(opened => {
        if (opened !== this.config.sidebar.opened) {
          this.store.dispatch(new ToggleSidebar());
        }
      });
    }
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
