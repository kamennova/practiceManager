import { AsyncStorage } from "react-native";

type DataKey = 'theme' | 'soundSrc' | 'encouraging-popups' | 'notifications';

export const writeData = async (key: DataKey, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    }
};

export const getData = async (key: DataKey): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.log(error);
    }

    return null;
};
