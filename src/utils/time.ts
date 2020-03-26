export enum TimeFormat {
    Short,
    Long,
}

export const minutesToHumanlyFormat = (minutes: number, _format?: TimeFormat): string => {
    if (minutes < 60) {
        return minutes + ' min';
    }

    return Math.floor(minutes / 60).toString() + ' hours' +
        (minutes % 60 > 0 ? minutes % 60 + ' minutes' : '');
};

export const formatSeconds = (time: number): string => time.toString().length > 1 ? time.toString() : '0' + time.toString();
