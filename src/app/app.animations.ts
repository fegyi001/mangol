import {
  animate,
  AnimationTriggerMetadata,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const routeStateTrigger: AnimationTriggerMetadata = trigger(
  'routeState',
  [transition('* => *', [])]
);

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
    transition('opened => closed', [animate('200ms ease-out')]),
    transition('closed => opened', [animate('200ms ease-out')])
  ]
);

export const homeButtonStateTrigger: AnimationTriggerMetadata = trigger(
  'homeButtonState',
  [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(
        500,
        keyframes([
          style({
            opacity: 0,
            offset: 0.2
          }),
          style({
            opacity: 0.5,
            offset: 0.5
          }),
          style({
            opacity: 1,
            offset: 1
          })
        ])
      )
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(
        500,
        keyframes([
          style({
            opacity: 1,
            offset: 0.2
          }),
          style({
            opacity: 0.5,
            offset: 0.5
          }),
          style({
            opacity: 0,
            offset: 1
          })
        ])
      )
    ])
  ]
);
