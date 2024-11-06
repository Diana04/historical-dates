import cn from 'clsx';

import { HistoricalDates } from '@/components/page-components/home';

import HISTORICAL_DATES from './historical-dates-mocks.json';
import styles from './page.module.scss';

export default function HomePage() {
    return (
        <div className={cn(styles['container'])}>
            <div className={cn(styles['content-container'])} >
                <HistoricalDates dates={HISTORICAL_DATES} />
            </div>
        </div>
    );
}
