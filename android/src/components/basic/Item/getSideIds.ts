import { Item } from "../../../types/item/Item";

export const getSideIds = (items: Item[], id: number): { prev?: number, next?: number } => {
    const index: number = items.findIndex(i => i.id === id);

    return {
        next: (index === -1 || index === items.length - 1) ? undefined : items[index + 1].id,
        prev: (index <= 0) ? undefined : items[index - 1].id
    };
};
