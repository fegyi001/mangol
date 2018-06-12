import { MangolConfigToolbar } from './config-toolbar.interface';

export interface MangolConfigSidebar {
  collapsible?: boolean;
  opened?: boolean;
  title?: string;
  toolbar?: MangolConfigToolbar;
  mode?: 'side' | 'push' | 'over';
}
