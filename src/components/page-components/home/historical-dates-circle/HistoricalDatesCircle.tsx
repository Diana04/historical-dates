import { useState, useMemo, useEffect } from 'react';
import cn from 'clsx';

import { CIRCLE_DEGREES_NUMBER } from '@/constants';

import { HistoricalPeriod } from '../types';
import {
    getClassNameSelector,
    getPeriodItemAngle,
    startFadeAnimation,
} from '../utils';
import styles from './styles.module.scss';

type Props = {
    items: HistoricalPeriod[];
    activeIndex: number;
    onChange: (index: number) => void;
}

const INITIAL_CIRCLE_ANGLE = -60;
const CIRCLE_RADIUS = 265;

export const HistoricalDatesCircle = ({
    items,
    activeIndex,
    onChange,
}: Props) => {
    const [containerAngle, setContainerAngle] = useState(INITIAL_CIRCLE_ANGLE);
    const [currentActiveIndex, setCurrentActiveIndex] = useState(activeIndex);

    const activeItem = useMemo(() => items[activeIndex], [activeIndex]);

    const changeActiveItem = (index: number) => {
        const indexDiff = currentActiveIndex - index;
        const newContainerAngle = containerAngle + (CIRCLE_DEGREES_NUMBER / items.length * indexDiff);
        
        setCurrentActiveIndex(index);
        setContainerAngle(newContainerAngle);
        
        startFadeAnimation(getClassNameSelector(styles['period-title--visible']));
    }

    const handlePeriodChange = (index: number) => {
        changeActiveItem(index);
        onChange(index);
    }

    useEffect(() => {
        changeActiveItem(activeIndex);
    }, [activeIndex]);

    return (
        <div
            className={cn(styles['circle-container'])}
            style={{
                transform: `rotate(${containerAngle}deg)`
            }}
        >
            {items.map((period, index) => (
                <div
                className={cn(styles['circle-icon'], {
                    [styles['circle-icon--active']]: index === currentActiveIndex
                })}
                style={{
                    transform: `rotate(${getPeriodItemAngle(index, items.length)}deg) translate(${CIRCLE_RADIUS}px)`
                }}
                onClick={() => handlePeriodChange(index)}
                key={period.title}
                >
                    <div
                        className={cn(styles['circle-icon-text'])}
                        style={{
                            transform: `rotate(${-(getPeriodItemAngle(index, items.length) + containerAngle)}deg)`
                        }}
                    >
                        {index + 1}
                        <div className={cn(styles['period-title'], {
                            [styles['period-title--visible']]: period.title === activeItem.title
                        })}>
                            {activeItem.title}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
