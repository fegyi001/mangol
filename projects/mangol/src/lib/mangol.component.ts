import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';

import { MangolConfig } from './interfaces/config.interface';
import { SetConfig } from './store/config.actions';
import {
  SetSidebarCollapsible,
  SetSidebarMode,
  SetSidebarOpened,
  ToggleSidebar,
  SetSidebarTitle,
  SetHasSidebar
} from './store/sidebar.actions';

@Component({
  selector: 'mangol',
  templateUrl: './mangol.component.html',
  styleUrls: ['./mangol.component.scss']
})
export class MangolComponent implements OnInit {
  @Input() config: MangolConfig;

  hasSidebar$: Observable<boolean>;
  sidebarOpened$: Observable<boolean>;
  sidebarMode$: Observable<string>;

  constructor(private store: Store) {
    this.hasSidebar$ = this.store.select(state => state.sidebar.hasSidebar);
    this.sidebarOpened$ = this.store.select(state => state.sidebar.opened);
    this.sidebarMode$ = this.store.select(state => state.sidebar.mode);
  }

  ngOnInit() {
    if (typeof this.config !== 'undefined' && this.config !== null) {
      // register the config in the Store
      this.store.dispatch(new SetConfig(this.config));

      this.store.dispatch(
        new SetHasSidebar(this.config.hasOwnProperty('sidebar'))
      );
      if (this.config.hasOwnProperty('sidebar')) {
        /**
         * Basic sidebar options
         */
        if (this.config.sidebar.hasOwnProperty('collapsible')) {
          this.store.dispatch(
            new SetSidebarCollapsible(this.config.sidebar.collapsible)
          );
        }
        if (this.config.sidebar.hasOwnProperty('mode')) {
          this.store.dispatch(new SetSidebarMode(this.config.sidebar.mode));
        }
        if (this.config.sidebar.hasOwnProperty('opened')) {
          this.store.dispatch(new SetSidebarOpened(this.config.sidebar.opened));
        }
        if (this.config.sidebar.hasOwnProperty('title')) {
          this.store.dispatch(new SetSidebarTitle(this.config.sidebar.title));
        }
      }
      // console.log(this.config);
    }
  }

  onOpenedChange(evt: boolean) {
    this.store.selectOnce(state => state.sidebar.mode).subscribe(mode => {
      if (mode === 'side') {
        this.store.selectOnce(state => state.map.map).subscribe((m: ol.Map) => {
          m.updateSize();
        });
      }
    });
  }
}
