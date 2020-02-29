import React from "react";
import { Text, View } from "react-native";

export const StartButton = () => {
    return (
        <View style={{
            position: 'absolute',
            right: 0,
            top: 0,
            left: 'auto',
            bottom: 'auto'
        }}>
            <Text>Start</Text>
        </View>
    );
};
