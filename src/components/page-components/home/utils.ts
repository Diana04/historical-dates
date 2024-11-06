import { gsap } from 'gsap';
import { ANIMATION_DURATION_FAST, ANIMATION_DURATION_SLOW, CIRCLE_DEGREES_NUMBER } from '@/constants';

import { HistoricalPeriod } from './types';

export const getPeriodItemAngle = (targetIndex: number, itemsCount: number) =>
    CIRCLE_DEGREES_NUMBER / itemsCount * targetIndex;

export const getStartDateOfPeriod = (historicalPeriod: HistoricalPeriod) =>
    historicalPeriod.events[0].year

export const getEndDateOfPeriod = (historicalPeriod: HistoricalPeriod) => {
    const lastIndex = historicalPeriod.events.length - 1;
    return historicalPeriod.events[lastIndex].year;
}

export const padNumber = (number: number, maxWidth: number) => String(number).padStart(maxWidth, '0');

export const getClassNameSelector = (className: string) => `.${className}`;

export const startNumberChangeAnimation = (target: gsap.TweenTarget, start: number, end: number) => {
    gsap.fromTo(target,
        {
            textContent: start,
        },
        {
            textContent: end,
            duration: ANIMATION_DURATION_FAST,
            ease: 'ease-out',
            snap: { textContent: 1 },
            stagger: 1,
        },
    );
}

export const startFadeAnimation = (target: gsap.TweenTarget, isMobile: boolean = false) => {
    if (isMobile) {
        gsap.fromTo(target,
            {
                opacity: 0,
                y: 10
            },
            {
                opacity: 1,
                delay: 0.2,
                duration: ANIMATION_DURATION_SLOW,
                y: 0,
                overwrite: true,
            },
        );
    } else {
        gsap.fromTo(target,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                delay: 1,
                duration: ANIMATION_DURATION_SLOW,
                overwrite: true,
            },
        );
    }
}
