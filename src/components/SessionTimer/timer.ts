import { BackHandler } from "react-native";

export const startTimer = (seconds: number, updateSeconds: (seconds: number) => void): any => {
    const timer = setTimeout(() => updateSeconds(seconds + 1), 1000);

    BackHandler.addEventListener('hardwareBackPress', () => {
        clearTimeout(timer);
        return true;
    });

    return timer;
};

export const startCountdown = (seconds: number, updateSeconds: (seconds: number) => void) => {
    const timer = setTimeout(() => updateSeconds(seconds - 1), 1000);

    BackHandler.addEventListener('hardwareBackPress', () => {
        clearTimeout(timer);
        return true;
    });

    return timer;
};
