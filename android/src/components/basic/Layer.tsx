import React from "react";
import { Dimensions, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

export const Layer = (props: { onPress: () => void, isDark?: boolean }) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={style(props.isDark)}/>
    </TouchableWithoutFeedback>
);

const style = (isDark?: boolean): ViewStyle => ({
    position: 'absolute',
        height: Dimensions.get("window").height,
        width: '100%',
        top: -40,
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.75)' : 'transparent',
        left: 0,
});
