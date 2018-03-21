import {
  animate,
  AnimationTriggerMetadata,
  group,
  query,
  style,
  transition,
  animateChild,
  trigger,
  state
} from '@angular/animations';

export const routeStateTrigger: AnimationTriggerMetadata = trigger(
  'routeState',
  [transition('* => *', [])]
);
