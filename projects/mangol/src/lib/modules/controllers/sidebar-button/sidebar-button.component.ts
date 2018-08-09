import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ToggleSidebar } from '../../../store/sidebar.state';
import {
  shownStateTrigger,
  sidebarButtonStateTrigger
} from '../controllers.animations';

@Component({
  selector: 'mangol-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.scss'],
  animations: [sidebarButtonStateTrigger, shownStateTrigger]
})
export class SidebarButtonComponent implements OnInit {
  sidebarOpened$: Observable<boolean>;

  constructor(private store: Store) {
    this.sidebarOpened$ = this.store.select(state => state.sidebar.opened);
  }

  ngOnInit() {}

  toggleSidebar() {
    this.store.dispatch(new ToggleSidebar());
  }
}
