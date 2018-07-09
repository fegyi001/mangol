import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'mangol-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.scss']
})
export class ControllersComponent implements OnInit {
  hasSidebar$: Observable<boolean>;
  sidebarCollapsible$: Observable<boolean>;
  constructor(private store: Store) {
    this.hasSidebar$ = this.store.select(state => state.sidebar.hasSidebar);
    this.sidebarCollapsible$ = this.store.select(
      state => state.sidebar.collapsible
    );
  }
  ngOnInit() {}
}
