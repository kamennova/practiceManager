import React from 'react';
import { TouchableNativeFeedback, TouchableWithoutFeedback, View } from "react-native";
import { HeaderIconWrap } from "../../../AppStyle";
import { useTheme } from "../../../theme";
import { MenuIcon } from "./Menu";
import { Ionicons } from '@expo/vector-icons';

type IconProps = { onPress: () => void };

export const DotsIcon = (props: IconProps) => {
    const colors = useTheme().colors;

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={{
                ...HeaderIconWrap(colors),
                marginLeft: 'auto'
            }}>
                <Ionicons size={25} name='md-more' color={colors.color}/>
            </View>
        </TouchableNativeFeedback>
    )
};

export const NavIcon = (props: IconProps) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={{ ...HeaderIconWrap(useTheme().colors), borderRadius: 0, paddingTop: 2 }}>
            <MenuIcon/>
        </View>
    </TouchableWithoutFeedback>
);

export const BackIcon = (props: IconProps) => {
    const colors = useTheme().colors;

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={HeaderIconWrap(colors)}>
                <Ionicons size={25} name='md-arrow-back' color={colors.color}/>
            </View>
        </TouchableWithoutFeedback>
    );
};
