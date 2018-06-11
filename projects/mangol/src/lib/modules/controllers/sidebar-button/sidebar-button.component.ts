import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToggleSidebar } from '../../../store/sidebar.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mangol-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.scss']
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
