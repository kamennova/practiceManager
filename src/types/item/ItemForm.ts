import { Route } from "react-native";
import { ActionType } from "./ActionType";

export type FormProps<T, Item extends Object> = {
    route: Route & {
        params:
            { mode?: ActionType.Create } |
            ({
                mode: ActionType.Edit,
            } & Item)
    },
    navigation: any,
    onHandleSave: (_: T) => any,
    addedItemId?: number,
};

export type FormState<Item extends Object> = {
    errors?: string,
} & Item;
