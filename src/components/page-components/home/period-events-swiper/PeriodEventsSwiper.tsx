import { useState, useRef, useCallback, useEffect } from 'react';
import cn from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

import ArrowLeftIcon from '@/assets/arrow-left.svg';
import { ButtonSize, ButtonType, IconButton } from '@/components/ui/icon-button';

import { HistoricalEvent } from '../types';
import styles from './styles.module.scss';

type Props = {
    events: HistoricalEvent[];
}

export const PeriodEventsSwiper = ({ events }: Props) => {
    const swiperRef = useRef<SwiperType>();
    const [isScrollBeginning, setIsScrollBeginning] = useState(true);
    const [isScrollEnd, setIsScrollEnd] = useState(false);

    const handleSlideChange = useCallback((swiper: SwiperType) => {
        if (swiper) {
            setIsScrollBeginning(swiper.isBeginning);
            setIsScrollEnd(swiper.isEnd)
        }
    }, [swiperRef]);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(0, 0);
        }
    }, [events])

    return (
        <div className={cn(styles['swiper-container'])}>
            <Swiper
                slidesPerView='auto'
                className={cn(styles['swiper'])}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={handleSlideChange}
            >
                {events.map((event) => (
                    <SwiperSlide className={cn(styles['event-container'])} key={event.year}>
                        <div className={cn(styles['event-year'])}>
                            {event.year}
                        </div>
                        <div className={cn(styles['event-description'])}>
                            {event.description}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={cn(styles['nav-container'])}>
                <div className={cn(styles['button'], {[styles['button--inactive']]: isScrollBeginning})}>
                    <IconButton
                        icon={() => <ArrowLeftIcon />}
                        onClick={() => swiperRef.current?.slidePrev()}
                        type={ButtonType.FILLED}
                        size={ButtonSize.SMALL}
                    />
                </div>
                <div className={cn(styles['button'], {[styles['button--inactive']]: isScrollEnd})}>
                    <IconButton
                        icon={() => <ArrowLeftIcon className={styles['arrow--right']} />}
                        onClick={() => swiperRef.current?.slideNext()}
                        type={ButtonType.FILLED}
                        size={ButtonSize.SMALL}
                    />
                </div>
            </div>
        </div>
    );
}
