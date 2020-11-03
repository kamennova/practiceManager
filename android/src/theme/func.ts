import { getData, writeData } from "../asyncStorage";
import { Theme } from "./Theme";

export const readTheme = async (): Promise<Theme | null> => {
    const value = await getData('theme');

    return value !== null ? value as Theme : null;
};

export const recordTheme = async (theme: Theme) => await writeData('theme', theme);
