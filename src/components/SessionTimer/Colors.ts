import { ActivityType } from "../../types/activity";

export const getScreenBgByActivity = (activity: ActivityType): string => {
    switch (activity) {
        case ActivityType.Break:
            return 'lightgrey';
        case ActivityType.Piece:
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
        case ActivityType.Piece:
            return '#714220';
        case ActivityType.Technique:
            return '#006596';
        case ActivityType.SightReading:
            return '#7a0090';
    }
};
