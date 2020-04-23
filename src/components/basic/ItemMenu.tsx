import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View, ViewStyle } from "react-native";
import { ItemMenuStyle } from "../../AppStyle";
import { ThemeColors, useTheme } from "../../theme";

export type MenuOption = {
    label: string,
    func: () => void,
};

export const ItemMenu = (props: { options: MenuOption[], postFunc?: () => void, style?: ViewStyle }) => {
    return (
        <View style={{ ...ItemMenuStyle(useTheme().colors), ...props.style }}>
            {props.options.map(item => (<OptionItem label={item.label} onPress={async () => {
                await item.func();
                if (props.postFunc !== undefined) props.postFunc();
            }}/>))}
        </View>
    );
};

export const OptionItem = (props: { label: string, onPress: (_: any) => any }) => {
    const styles = getStyles(useTheme().colors);
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={styles.wrap}>
                <Text style={styles.text}>
                    {props.label}
                </Text>
            </View>
        </TouchableNativeFeedback>
    )
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
    wrap: { padding: 10, paddingLeft: 16, paddingRight: 16 },
    text: { fontSize: 17, color: colors.color },
});
