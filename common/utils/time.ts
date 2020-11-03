export enum TimeFormat {
    Short,
    Long,
}

export type Time = {
    m: number,
    h: number,
};

export const secondsToHumanlyFormat = (totalSeconds: number): string => {
    if (totalSeconds === 0) {
        return '0';
    } else if (totalSeconds < 60) {
        return totalSeconds + 's';
    }

    const s = totalSeconds % 60,
        m = Math.floor(totalSeconds / 60),
        h = Math.floor(m / 60);

    return formatMinutesShort(m) + (h > 0 ? '' : ` ${s}s`);
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

export const formatDateDiff = (date: Date): string => {
    const dateDiff = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));

    if (dateDiff === 0) {
        return 'Today'
    } else if (dateDiff === 1) {
        return 'Yesterday';
    } else if (dateDiff < 7) {
        return `${dateDiff} days ago`;
    } else if (dateDiff < 30) {
        const weeks = Math.floor(dateDiff / 7);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }

    return 'Long ago';
};

export const daysAgo = (days: number): Date => new Date(new Date().setDate(new Date().getDate() - days));
