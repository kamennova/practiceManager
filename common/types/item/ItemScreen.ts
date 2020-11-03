import { Route } from "react-native";

export type ItemScreenProps<PreviewT> = {
    route: Route & { params: { id: number, lastUpdated?: number } },
    sideIds: {
        next?: number,
        prev?: number,
    },
    preview?: PreviewT,
    deleteItem: () => void,
    toggleItemFav: () => void,
};
