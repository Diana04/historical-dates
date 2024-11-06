export type HistoricalEvent = {
    year: number;
    description: string;
}

export type HistoricalPeriod = {
    title: string;
    events: HistoricalEvent[];
}
