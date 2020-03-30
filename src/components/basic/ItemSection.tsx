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

const style = { ...AppPaddingStyle, borderTopWidth: 1, borderColor: 'lightgrey', paddingTop: 20, paddingBottom: 20 };
