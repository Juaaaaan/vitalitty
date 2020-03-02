import { trigger, transition, style, animate } from '@angular/animations';

export const accordionHeight = trigger('accordionHeight', [
    transition('void => *', [
        style({ height: 0, width: '100%', overflow: 'hidden' }),
        animate('.2s ease-in', style({ height: '*' }))
    ]),
    transition('* => void', [
        style({ height: '*', width: '100%', overflow: 'hidden' }),
        animate('.2s ease-out', style({ height: 0 }))
    ])
]);

export const accordionWidth = trigger('accordionWidth', [
    transition('void => *', [
        style({ width: '0', height: '100%', overflow: 'hidden' }),
        animate('.2s ease-in', style({ width: '*' }))
    ]),
    transition('* => void', [
        style({ width: '*', height: '100%', overflow: 'hidden' }),
        animate('.2s ease-out', style({ width: 0 }))
    ])
]);
