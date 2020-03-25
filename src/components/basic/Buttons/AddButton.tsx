import * as React from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import { AddButtonStyle, Dark } from "../../../AppStyle";

export const AddButton = (props: { onPress: () => void }) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={AddButtonStyle}>
                <Text style={{color: Dark, fontSize: 50, lineHeight: 58}}>+</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};
