import { MangolConfigToolbar } from './mangol-config-toolbar.interface';
export interface MangolConfigSidebar {
  collapsible: boolean,
  opened: boolean,
  toolbar?: MangolConfigToolbar
}
