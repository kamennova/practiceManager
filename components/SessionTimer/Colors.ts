import { ActivityType } from "../../types/Activity";

export const getScreenBgByActivity = (activity: ActivityType): string => {
    switch (activity) {
        case ActivityType.Break:
            return 'lightgrey';
        case ActivityType.WarmUp:
            return '#ea6f3b';
        case ActivityType.Pieces:
            return '#eeede7';
        case ActivityType.Technique:
            return '#b3d4d6';
        case ActivityType.SightReading:
            return '#dac1ce';
    }
};

export const getActivityColor = (activity: ActivityType): string => {
    switch (activity) {
        case ActivityType.Break:
            return '#4a3f68';
        case ActivityType.WarmUp:
            return '#ffe598';
        case ActivityType.Pieces:
            return '#714220';
        case ActivityType.Technique:
            return '#006596';
        case ActivityType.SightReading:
            return '#42006b';
    }
};
