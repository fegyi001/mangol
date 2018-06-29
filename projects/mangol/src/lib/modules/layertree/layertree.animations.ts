import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

const duration = 300;

export const layertreeVisibilityIconStateTrigger: AnimationTriggerMetadata = trigger(
  'layertreeVisibilityIconState',
  [
    state(
      'unchecked',
      style({
        transform: 'rotate(0deg)'
      })
    ),
    state(
      'checked',
      style({
        transform: 'rotate(180deg)'
      })
    ),
    transition('unchecked => checked', [animate(duration + 'ms ease-out')]),
    transition('checked => unchecked', [animate(duration + 'ms ease-out')])
  ]
);

export const slideStateTrigger: AnimationTriggerMetadata = trigger(
  'slideState',
  [
    state(
      'up',
      style({
        height: '0px',
        display: 'none',
        opacity: 0
      })
    ),
    state(
      'down',
      style({
        height: '*'
      })
    ),
    transition('up => down', [animate(duration + 'ms ease-out')]),
    transition('down => up', [animate(duration + 'ms ease-out')])
  ]
);
