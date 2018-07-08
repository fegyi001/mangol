export interface LayerGroupDetailItem {
  fontSet: string;
  fontIcon: string;
  text: string;
  disabled: boolean;
  type: 'toggle_on' | 'toggle_off' | 'expand_all' | 'collapse_all';
}
