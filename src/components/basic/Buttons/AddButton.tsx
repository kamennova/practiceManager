import * as React from "react";
import { View, Text, ViewStyle, TouchableWithoutFeedback } from "react-native";
import { AddButtonStyle } from "../../../AppStyle";

export const AddButton = (props: { onPress: () => void, style?: ViewStyle }) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{
                ...AddButtonStyle,
                position: 'absolute',
                right: 0,
                top: 0,
                ...props.style,
            }}>
                <Text>Add new</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};
