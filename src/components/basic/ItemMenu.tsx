import React from "react";
import { FlatList, StyleSheet, Text, TouchableNativeFeedback, View, ViewStyle } from "react-native";
import { ItemMenuStyle } from "../../AppStyle";

export type MenuOption = {
    label: string,
    func: () => void,
};

export const ItemMenu = (props: { options: MenuOption[], prevFunc?: () => void, style?: ViewStyle }) => {
    return (
        <View style={{...ItemMenuStyle, ...props.style}}>
            <FlatList data={props.options} renderItem={({ item }) => (<OptionItem label={item.label} onPress={() => {
                item.func();
                if (props.prevFunc !== undefined) props.prevFunc();
            }}/>)}/>
        </View>
    );
};

export const OptionItem = (props: { label: string, onPress: (_: any) => any }) => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <View style={styles.wrap}>
            <Text style={styles.text}>
                {props.label}
            </Text>
        </View>
    </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
    wrap: { padding: 10, paddingLeft: 16, paddingRight: 16 },
    text: { fontSize: 17 }
});
