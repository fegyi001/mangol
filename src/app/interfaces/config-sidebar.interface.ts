import { MangolConfigToolbar } from './config-toolbar.interface';

export interface MangolConfigSidebar {
  collapsible: boolean;
  opened: boolean;
  toolbar?: MangolConfigToolbar;
  mode?: string;
}
