export type Optional<T> = {
    [key in keyof T]?: T[key]
}

export const getCookie = (name: string): string | undefined => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match !== null) {
        return match[2];
    }

    return undefined;
};

export const clearCookie = (name: string): void => {
    document.cookie = `${name}=;`;
};
