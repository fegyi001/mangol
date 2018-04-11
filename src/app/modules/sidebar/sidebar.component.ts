import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

import { MangolMap } from '../../classes/map.class';
import { MangolConfigSidebar } from '../../interfaces/config-sidebar.interface';
import { MangolConfigToolbarItem } from '../../interfaces/config-toolbar.interface';

@Component({
  selector: 'mangol-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MangolSidebarComponent implements OnInit, DoCheck {
  @HostBinding('class') class = 'mangol-sidebar';

  @Input() options: MangolConfigSidebar;
  @Input() map: MangolMap;

  sidebarClosed: boolean;
  selectedIndex = 0;
  items: MangolConfigToolbarItem[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.sidebarClosed = false;
    if (this.options.hasOwnProperty('toolbar')) {
      for (const key in this.options.toolbar) {
        if (this.options.toolbar.hasOwnProperty(key)) {
          const item: MangolConfigToolbarItem = {
            ...this.options.toolbar[key],
            type: key
          };
          this.items.push(item);
        }
      }
    }
    this.map.updateSize();
  }

  ngDoCheck() {
    this.cdr.detectChanges();
  }

  getTitle(item: MangolConfigToolbarItem): string {
    if (item.hasOwnProperty('title')) {
      return item.title;
    }
    switch (item.type) {
      case 'layertree':
        return 'Layertree';
      case 'featureinfo':
        return 'Feature information';
      case 'measure':
        return 'Measure';
      case 'print':
        return 'Print to file';
      default:
        return null;
    }
  }

  getFontSet(item: MangolConfigToolbarItem): string {
    if (item.hasOwnProperty('fontSet')) {
      return item.fontSet;
    }
    switch (item.type) {
      case 'layertree':
        return 'ms';
      case 'featureinfo':
        return 'ms';
      case 'measure':
        return 'ms';
      case 'print':
        return 'ms';
      default:
        return 'ms';
    }
  }

  getFontIcon(item: MangolConfigToolbarItem): string {
    if (item.hasOwnProperty('fontIcon')) {
      return item.fontIcon;
    }
    switch (item.type) {
      case 'layertree':
        return 'ms-layers';
      case 'featureinfo':
        return 'ms-information';
      case 'measure':
        return 'ms-measure-distance';
      case 'print':
        return 'ms-printer';
      default:
        return null;
    }
  }

  toggleSidebar(): any {
    this.sidebarClosed = !this.sidebarClosed;
  }

  onSelectedTabChange(evt: MatTabChangeEvent) {
    this.selectedIndex = evt.index;
  }
}
