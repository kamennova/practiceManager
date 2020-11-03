import React from "react";
import { Text, View } from "react-native";
import { SectionRowStyle as getStyle } from "../../AppStyle";
import { useTheme } from "../../theme";

export const SectionRow = (props: { label: string, children: JSX.Element }) => {
    const styles = getStyle(useTheme().colors);

    return (
        <View style={styles.row}>
            <Text style={styles.label}>{props.label}</Text>
            {props.children}
        </View>
    );
};
