import React from 'react';
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

export const TimerButton = (props: { children: string, onPress: () => void, btnStyle?: ViewStyle }) => {
    return (
        <TouchableWithoutFeedback>
            <View style={{
                padding: 15,
                borderWidth: 1,
                borderColor: 'grey',
                ...props.btnStyle,
            }}>
                <Text>
                    {props.children}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};
