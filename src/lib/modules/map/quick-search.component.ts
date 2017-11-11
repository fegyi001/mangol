import { HostBinding, OnInit, OnDestroy, Component, Input } from '@angular/core';
import { MangolMap } from '../../core/map';

@Component({
  selector: 'mangol-quick-search',
  templateUrl: './quick-search.component.html'
})
export class MangolQuickSearchComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'mangol-quick-search';

  @Input() map: MangolMap;
  @Input() opts: any

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }


}
