import { AnimationTriggerMetadata, animate, state, style, transition, trigger } from "@angular/animations";

export const fadeInOut: AnimationTriggerMetadata = trigger('fadeInOut', [
    state(
        'open',
        style({ opacity: 1 })
    ),
    state(
        'close',
        style({ opacity: 0 })
    ),
    transition('open => close', [animate('1s ease-out')]),
    transition('close => open', [animate('1s ease-in')])
]);