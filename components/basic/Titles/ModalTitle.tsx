import React from 'react';
import { Text } from "react-native";
import { ModalTitleStyle } from "../../../AppStyle";
import { TitleProps } from "./Titles";

export const ModalTitle = (props: TitleProps) => (
    <Text style={{
        ...ModalTitleStyle,
        ...props.style
    }}>
        {props.children}
    </Text>
);

export const ModalSmallTitle = (props: TitleProps) => (
    <Text style={{
        ...ModalTitleStyle,
        fontSize: 14,
        marginBottom: 10,
    }}>
        {props.children}
    </Text>
);
