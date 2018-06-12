import {
  animate,
  AnimationTriggerMetadata,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const sidebarButtonStateTrigger: AnimationTriggerMetadata = trigger(
  'sidebarButtonState',
  [
    state(
      'opened',
      style({
        transform: 'rotate(0deg)'
      })
    ),
    state(
      'closed',
      style({
        transform: 'rotate(180deg)'
      })
    ),
    transition('opened => closed', [animate('300ms ease-out')]),
    transition('closed => opened', [animate('300ms ease-out')])
  ]
);
