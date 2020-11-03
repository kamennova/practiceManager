import React from 'react';
import { View } from "react-native";
import { ItemBtnsStyle } from "../../../AppStyle";

export const ItemButtonsWrap = (props: { children: JSX.Element[] }) => (
    <View style={ItemBtnsStyle()}>
        {props.children}
    </View>
);
