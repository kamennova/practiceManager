export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1),
    trimStrArr = (arr: string[]): string[] => arr.filter(t => t !== '').map(t => t.trim());
