import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations'

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
)

export const shownStateTrigger: AnimationTriggerMetadata = trigger(
  'shownState',
  [
    transition(':enter', [
      style({
        opacity: 0
      }),
      animate(
        '200ms ease-out',
        style({
          opacity: 1
        })
      )
    ]),
    transition(':leave', [
      animate(
        '500ms ease-out',
        style({
          opacity: 0
        })
      )
    ])
  ]
)
