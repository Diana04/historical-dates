'use client'

import { useState, useRef, useMemo } from 'react';
import cn from 'clsx';

import ArrowLeftIcon from '@/assets/arrow-left.svg';
import { IconButton } from '@/components/ui/icon-button';
import { useIsMobile } from '@/hooks/useIsMobile';

import { HistoricalPeriod } from '../types';
import { PeriodEventsSwiper } from '../period-events-swiper';
import  { HistoricalDatesCircle } from '../historical-dates-circle'
import {
    startNumberChangeAnimation,
    getEndDateOfPeriod,
    getStartDateOfPeriod,
    padNumber,
    startFadeAnimation,
    getClassNameSelector,
} from '../utils';
import styles from './styles.module.scss';

type Props = {
    dates: HistoricalPeriod[],
}

export const HistoricalDates = ({ dates }: Props) => {
    const [activePeriodIndex, setActivePeriodIndex] = useState(0);
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
    const swiperRef = useRef(null);
    const isMobile = useIsMobile();

    const activePeriod = useMemo(() => dates[activePeriodIndex], [activePeriodIndex]);

    const handlePeriodChange = (index: number) => {
        const nextPeriod = dates[index];

        setActivePeriodIndex(index);

        startNumberChangeAnimation(
            startDateRef.current,
            getStartDateOfPeriod(activePeriod),
            getStartDateOfPeriod(nextPeriod)
        );
        startNumberChangeAnimation(
            endDateRef.current,
            getEndDateOfPeriod(activePeriod),
            getEndDateOfPeriod(nextPeriod)
        );

        startFadeAnimation(swiperRef.current, isMobile);
        startFadeAnimation(getClassNameSelector(styles['period-title']), true);
    }

    return (
        <div className={cn(styles['container'])}>
            <h2 className={cn(styles['title'])}>Исторические даты</h2>

            <div className={cn(styles['top-container'])}>
                <div className={cn(styles['period-dates'])}>
                    <span
                        ref={startDateRef}
                        className={cn(styles['period-date'], styles['period-date--start'])}
                    >
                        {getStartDateOfPeriod(activePeriod)}
                    </span>
                    <span
                        ref={endDateRef}
                        className={cn(styles['period-date'], styles['period-date--end'])}
                    >
                        {getEndDateOfPeriod(activePeriod)}
                    </span>
                </div>

                <div className={cn(styles['dates-circle-container'])}>  
                    <HistoricalDatesCircle
                        items={dates}
                        activeIndex={activePeriodIndex}
                        onChange={handlePeriodChange}
                    />
                </div>
                <div className={cn(styles['period-title'])}>
                    {activePeriod.title}
                </div>
                <div className={cn(styles.separator, styles['separator--horizontal'])} />
            </div>

            <div className={cn(styles['bottom-container'])}>
                <div className={cn(styles.nav)}>
                    <div className={cn(styles['nav__title'])}>
                        {padNumber(activePeriodIndex + 1, 2)}/{padNumber(dates.length, 2)}
                    </div>

                    <div className={cn(styles['nav__arrows'])}>
                        <IconButton
                            icon={() => <ArrowLeftIcon />}
                            onClick={() => handlePeriodChange(activePeriodIndex - 1)}
                            isDisabled={activePeriodIndex === 0}
                        />
                        <div className={styles['nav__button--right']}>
                            <IconButton
                                icon={() => <ArrowLeftIcon />}
                                onClick={() => handlePeriodChange(activePeriodIndex + 1)}
                                isDisabled={activePeriodIndex === dates.length - 1}
                            />
                        </div>
                    </div>

                    <div className={cn(styles['nav__pagination'])}>
                        {dates.map((date, index) => (
                            <div
                                className={cn(styles['nav__pagination-item'], {
                                    [styles['nav__pagination-item--active']]: index === activePeriodIndex
                                })}
                                onClick={() => handlePeriodChange(index)}
                                key={date.title}
                            />
                        ))}
                    </div>
                </div>
                            
                <div ref={swiperRef} className={cn(styles['swiper-container'])}>
                    <PeriodEventsSwiper events={activePeriod.events} />
                </div>
            </div>
            <div className={cn(styles.separator, styles['separator--vertical'])} />
        </div>
    );
}
