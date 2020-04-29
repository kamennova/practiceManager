import React from "react";
import { TouchableNativeFeedback, View, ViewStyle } from "react-native";
import { useTheme } from "../../../theme";
import { Ionicons } from '@expo/vector-icons';
import { Direction } from "../../../types/Direction";

type IconProps = {
    onPress?: () => void,
    size?: number,
    wrapStyle?: ViewStyle,
    color?: string,
    direction?: Direction,
};

export const ArrowIcon = (props: IconProps) => {
    const color = props.color || useTheme().colors.color;
    const degs = 90 * (props.direction !== undefined ? props.direction : 0);

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center', ...props.wrapStyle,
                transform: [{ rotate: degs + 'deg' }]
            }}>
                <Ionicons size={props.size || 25} name='md-arrow-back' color={color}/>
            </View>
        </TouchableNativeFeedback>
    );
};

