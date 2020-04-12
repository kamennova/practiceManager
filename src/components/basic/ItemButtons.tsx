import React from 'react';
import { View } from "react-native";
import { ItemBtnsStyle } from "../../AppStyle";
import { useTheme } from "../../theme";

export const ItemButtonsWrap = (props: { children: JSX.Element[] }) => (
    <View style={ItemBtnsStyle(useTheme().colors)}>
        {props.children}
    </View>
);
