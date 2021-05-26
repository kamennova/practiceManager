import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

export enum DeviceSize {
    Small = 1,
    Medium = 2,
    Big = 3,
}

export const useDeviceSize =  () => {
    const isSmall = useMediaQuery({
        maxDeviceWidth: 420
    });

    const isMedium = useMediaQuery({
        maxDeviceWidth: 600
    });

    return isSmall ? DeviceSize.Small : (isMedium ? DeviceSize.Medium : DeviceSize.Big);
};
