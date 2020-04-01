import React from "react";
import { View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { SmallTitle } from "./Titles/Titles";

export const ItemSection = (props: {children: JSX.Element | JSX.Element[], title: string}) => (
    <View style={style}>
        <SmallTitle>{props.title}</SmallTitle>
        {props.children}
    </View>
);

const style = {
    ...AppPaddingStyle,
    paddingTop: 18,
    paddingBottom: 18,
};
