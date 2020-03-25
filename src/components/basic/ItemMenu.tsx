import React from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import { ItemMenuStyle } from "../../AppStyle";

export type MenuOption = {
    label: string,
    func: () => void,
};

export const ItemMenu = (props: { options: MenuOption[], prevFunc?: () => void }) => {
    return (
        <View style={ItemMenuStyle}>
            {props.options.map(item => (
                <OptionItem label={item.label} onPress={() => {
                    if (props.prevFunc !== undefined) props.prevFunc();
                    item.func();
                }}/>
            ))}
        </View>
    );
};

export const OptionItem = (props: { label: string, onPress: (_: any) => any }) => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <Text style={{ fontSize: 17, marginBottom: 15 }}>
            {props.label}
        </Text>
    </TouchableNativeFeedback>
);
