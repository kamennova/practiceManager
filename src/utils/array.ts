export const swipe = <T>(arr: T[], index1: number, index2: number): T[] => {
    const newArr = [...arr];
    const temp = newArr[index1];

    newArr[index1] = newArr[index2];
    newArr[index2] = temp;

    return newArr;
};

export const enumKeys = <E>(en: E): string[] => Object.keys(en).filter(key => isNaN(Number(key)));
