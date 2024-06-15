import { AnimationTransitionMetadata, transition, style, animate, AnimationTriggerMetadata, trigger } from "@angular/animations";

const enterTransition: AnimationTransitionMetadata = transition(':enter', [
    style({ opacity: 0 }),
    animate('1s ease-in', style({ opacity: 1 })),
]);
const leaveTransition: AnimationTransitionMetadata = transition(':leave', [
    style({ opacity: 1 }),
    animate('1s ease-in', style({ opacity: 0 })),
]);

export const fadeIn: AnimationTriggerMetadata = trigger('fadeIn', [enterTransition]);
export const fadeOut: AnimationTriggerMetadata = trigger('fadeOut', [leaveTransition]);