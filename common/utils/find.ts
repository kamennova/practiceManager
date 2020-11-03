import { Item } from "../types/item/Item";

export const findItemOrThrowError = <T extends Item>(items: T[], id: number): T => {
    const item = items.find(i => i.id === id);

    if (item === undefined) {
        throw new Error(`Item with id ${id} not found`);
    }

    return item;
};
