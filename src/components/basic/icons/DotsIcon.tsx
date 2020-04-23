import React from "react";
import { TouchableNativeFeedback, View, ViewStyle } from "react-native";
import { useTheme } from "../../../theme";
import { Ionicons } from '@expo/vector-icons';

type IconProps = { onPress: () => void, wrapStyle?: ViewStyle, size?: number};

export const DotsIcon = (props: IconProps) => {
    const colors = useTheme().colors;

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={{alignItems: 'center', ...props.wrapStyle}}>
                <Ionicons size={25} name='md-more' color={colors.color}/>
            </View>
        </TouchableNativeFeedback>
    )
};
