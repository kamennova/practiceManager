import * as React from "react";
import { View, Text, ViewStyle, TouchableWithoutFeedback } from "react-native";
import { AddButtonStyle } from "../../../AppStyle";

export const AddButton = (props: { onPress: () => void, style?: ViewStyle }) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{
                ...AddButtonStyle,
                ...props.style,
            }}>
                <Text>Add new</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};
