import React from 'react';
import { Text } from "react-native";
import { ModalTitleStyle, SmallModalTitleStyle } from "../../../AppStyle";
import { useTheme } from "../../../theme";
import { TitleProps } from "./Titles";

export const ModalTitle = (props: TitleProps) => (
    <Text style={ModalTitleStyle(useTheme().colors)}>
        {props.children}
    </Text>
);

export const ModalSmallTitle = (props: TitleProps) => (
    <Text style={SmallModalTitleStyle(useTheme().colors)}>
        {props.children}
    </Text>
);
