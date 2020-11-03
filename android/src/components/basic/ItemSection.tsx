import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { useTheme } from "../../theme";

type SectionProps = {
    children: JSX.Element | (JSX.Element| undefined)[],
    title: string,
    activeElem?: JSX.Element,
};

export const ItemSection = (props: SectionProps) => (
    <View style={style.wrap}>
        <View style={style.header}>
            <Text style={{ color: useTheme().colors.colorFaded }}>{props.title}</Text>
            {props.activeElem ? props.activeElem : undefined}
        </View>
        {props.children}
    </View>
);

const style = StyleSheet.create({
    wrap: {
        ...AppPaddingStyle,
        paddingTop: 15,
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 7,
    },
});
