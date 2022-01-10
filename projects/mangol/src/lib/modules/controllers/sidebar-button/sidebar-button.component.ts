import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as fromMangol from '../../../store/mangol.reducers'
import * as SidebarActions from '../../../store/sidebar/sidebar.actions'
import {
  shownStateTrigger,
  sidebarButtonStateTrigger
} from '../controllers.animations'

@Component({
  selector: 'mangol-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.scss'],
  animations: [sidebarButtonStateTrigger, shownStateTrigger]
})
export class SidebarButtonComponent {
  sidebarOpened$: Observable<boolean>

  constructor(private store: Store<fromMangol.MangolState>) {
    this.sidebarOpened$ = this.store.select((state) => state.sidebar.opened)
  }

  toggleSidebar() {
    this.store.dispatch(new SidebarActions.Toggle())
  }
}
