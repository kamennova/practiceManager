import * as React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { AddButtonStyle } from "../../../AppStyle";

export const AddButton = (props: { onPress: () => void }) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={AddButtonStyle.wrap}>
                <Text style={AddButtonStyle.plus}>+</Text>
                <Text style={AddButtonStyle.text}>Add</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};
