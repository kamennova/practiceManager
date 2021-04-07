export const swipe = <T>(arr: T[], index1: number, index2: number): T[] => {
    const newArr = [...arr];
    const temp = newArr[index1];

    newArr[index1] = newArr[index2];
    newArr[index2] = temp;

    return newArr;
};

export const enumKeys = <E>(en: E): string[] => Object.keys(en).filter(key => isNaN(Number(key)));

export const replaceItem = <T extends { id: number }>(arr: T[], newItem: T): T[] =>
    arr.map((item) => item.id === newItem.id ? newItem : item);

export const pieceGroupBy = (pieces: Array<{ pieceId: number, duration: number }>): { [key: number]: number } => {
    return pieces.reduce((acc, curr) => {
        // @ts-ignore
        if (acc[curr.pieceId] === undefined) {
            // @ts-ignore
            acc[curr.pieceId] = curr.duration;
        } else {
            // @ts-ignore
            acc[curr.pieceId] += curr.duration;
        }

        return acc;
    }, {});
};
