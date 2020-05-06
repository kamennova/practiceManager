import { Activity, ActivityType } from "../types/Activity";
import { PieceBase } from "../types/Piece";

export const getActivityTitle = (activity: Activity, pieceCredits?: PieceCredits): string => {
    switch (activity.type) {
        case ActivityType.Break:
            return ActivityType.Break;
        case ActivityType.SightReading:
            return 'Sight reading' + (pieceCredits?.name !== undefined ? ': ' + pieceCredits.name : '');
        case ActivityType.Piece:
            return (pieceCredits?.name !== undefined ? pieceCredits.name : 'Piece');
        case ActivityType.Technique:
            return (activity.exercise !== undefined ? activity.exercise : 'Technique') +
                (activity.tonality !== undefined ? ' ' + activity.tonality : '');
    }
};

export const getTimerActivityTitle = (activity: Activity, pieceCredits?: PieceCredits): TimerTitle => {
    const authors = pieceCredits?.authors !== undefined ? pieceCredits.authors.toString() : undefined;

    switch (activity.type) {
        case ActivityType.Break:
            return { main: 'Break' };
        case ActivityType.SightReading:
            return {
                main: 'Sight reading',
                small: pieceCredits !== undefined ? pieceCredits.name + (authors !== undefined ? ' by ' + authors : '')
                    : undefined,
            };
        case ActivityType.Piece:
            return {
                main: pieceCredits?.name !== undefined ? pieceCredits.name : 'Piece',
                small: authors !== undefined ? authors : undefined
            };
        case ActivityType.Technique:
            return {
                main: (activity.exercise !== undefined ? activity.exercise : 'Technique') +
                    (activity.tonality !== undefined ? ' in ' + activity.tonality : '')
            };
    }
};

export const getPieceCredits = (pieces: PieceBase[], id?: number): PieceCredits | undefined => {
    if (id === undefined) {
        return undefined;
    }

    const piece = pieces.find(item => item.id === id);

    return piece !== undefined ? { name: piece.name, authors: piece.authors } : undefined;
};

export type PieceCredits = {
    name: string,
    authors?: string[],
};

type TimerTitle = {
    small?: string,
    main: string
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
