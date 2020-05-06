export enum TimeFormat {
    Short,
    Long,
}

export type Time = {
    m: number,
    h: number,
};

export const secondsToHumanlyFormat = (seconds: number): string => {
    if (seconds === 0) {
        return '0';
    }

    if (seconds < 60) {
        return seconds + 's';
    }

    return formatMinutesShort(Math.floor(seconds) / 60);
};

export const minutesToHumanlyFormat = (minutes: number, _format?: TimeFormat): string => {
    if (minutes < 60) {
        return minutes + ' min';
    }

    return Math.floor(minutes / 60).toString() + ' hours' +
        (minutes % 60 > 0 ? minutes % 60 + ' minutes' : '');
};

export const formatMinutesShort = (minutes: number): string => {
    if (minutes < 60) {
        return minutes + 'm';
    }

    return Math.floor(minutes / 60).toString() + 'h ' +
        (minutes % 60 > 0 ? minutes % 60 + 'm' : '');
};

export const formatSeconds = (time: number): string => time.toString().length > 1 ?
    time.toString() : '0' + time.toString();

export const getMinutes = (m: number) => m % 60,
    getHours = (m: number) => Math.floor(m / 60);

export const toMinutes = (t: Time) => t.m + t.h * 60;

export const getSeconds = () => Math.floor(Date.now() / 1000); // todo date.now.getSeconds?

export const dayToSeconds = (d: number) => d * 24 * 60 * 60;

export const getDaysFromSeconds = (s: number) => Math.floor(s / 60 / 60 / 24);
