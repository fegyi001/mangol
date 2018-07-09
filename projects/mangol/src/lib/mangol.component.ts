import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import Map from 'ol/Map';
import { Observable } from 'rxjs';

import { MangolConfig } from './interfaces/config.interface';
import { SetConfig } from './store/config.state';
import {
  SetHasSidebar,
  SetSidebarCollapsible,
  SetSidebarMode,
  SetSidebarOpened,
  SetSidebarTitle,
  ToggleSidebar
} from './store/sidebar.state';

@Component({
  selector: 'mangol',
  templateUrl: './mangol.component.html',
  styleUrls: ['./mangol.component.scss']
})
export class MangolComponent implements OnInit {
  @HostBinding('class') class = 'mangol';
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
    this.store.dispatch(new SetConfig(this.config));
    if (typeof this.config !== 'undefined' && this.config !== null) {
      // register the config in the Store
      this.store.dispatch(new SetHasSidebar(!!this.config.sidebar));
      if (!!this.config.sidebar) {
        /**
         * Basic sidebar options
         */
        if (!!this.config.sidebar.collapsible) {
          this.store.dispatch(
            new SetSidebarCollapsible(this.config.sidebar.collapsible)
          );
        }
        if (!!this.config.sidebar.mode) {
          this.store.dispatch(new SetSidebarMode(this.config.sidebar.mode));
        }
        if (!!this.config.sidebar.opened) {
          this.store.dispatch(new SetSidebarOpened(this.config.sidebar.opened));
        }
        if (!!this.config.sidebar.title) {
          this.store.dispatch(new SetSidebarTitle(this.config.sidebar.title));
        }
      }
    }
  }

  onOpenedChange(evt: boolean) {
    this.store.selectOnce(state => state.sidebar.opened).subscribe(opened => {
      if (opened !== evt) {
        this.store.dispatch(new ToggleSidebar());
      }
      this.store.selectOnce(state => state.map.map).subscribe((m: Map) => {
        if (m !== null) {
          m.updateSize();
        }
      });
    });
  }
}
