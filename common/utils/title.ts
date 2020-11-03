import { Activity, ActivityType, TechniqueActivity } from "../types/activity";
import { PieceBase } from "../types/piece";

export type PieceCredits = {
    name: string,
    author?: string,
};

export const getActivityTitle = (activity: Activity, pieceCredits?: PieceCredits): string => {
    switch (activity.type) {
        case ActivityType.Break:
            return ActivityType.Break;
        case ActivityType.SightReading:
            return 'Sight reading' + (pieceCredits?.name !== undefined ? ': ' + pieceCredits.name : '');
        case ActivityType.Piece:
            return (pieceCredits?.name !== undefined ? pieceCredits.name : 'Piece');
        case ActivityType.Technique:
            return getTechniqueTitle(activity);
    }
};

type TimerTitle = {
    small?: string,
    main: string
};

export const getTimerActivityTitle = (activity: Activity, pieceCredits?: PieceCredits): TimerTitle => {
    const author = pieceCredits?.author !== undefined ? pieceCredits.author : undefined;

    switch (activity.type) {
        case ActivityType.Break:
            return { main: 'Break' };
        case ActivityType.SightReading:
            return {
                main: 'Sight reading',
                small: pieceCredits !== undefined ? pieceCredits.name + (author !== undefined ? ' by ' + author : '')
                    : undefined,
            };
        case ActivityType.Piece:
            return {
                main: pieceCredits?.name !== undefined ? pieceCredits.name : 'Piece',
                small: author !== undefined ? author : undefined
            };
        case ActivityType.Technique:
            return { main: getTechniqueTitle(activity), };
    }
};

const getTechniqueTitle = (activity: TechniqueActivity) =>
    (activity.exercise !== undefined ? activity.exercise : 'Technique') +
    (activity.tonality !== undefined ? ' in ' + activity.tonality : '');

export const getPieceCredits = (pieces: PieceBase[], id?: number): PieceCredits | undefined => {
    if (id === undefined) {
        return undefined;
    }

    const piece = pieces.find(item => item.id === id);

    return piece !== undefined ? { name: piece.name, author: piece.author } : undefined;
};

export const getPlannedSessionActivityTitle = (activityType: ActivityType): TimerTitle => {
    return {
        small: 'time for',
        main: activityType
    }
};

export const getFreeSessionActivityTitle = (activityType: ActivityType): TimerTitle => {
    return {
        small: activityType !== ActivityType.Break ? 'polishing' : 'time for',
        main: activityType,
    };
};
