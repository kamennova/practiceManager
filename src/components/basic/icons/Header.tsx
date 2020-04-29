import React from 'react';
import { TouchableNativeFeedback, View } from "react-native";
import { HeaderIconWrap } from "../../../AppStyle";
import { useTheme } from "../../../theme";
import { Direction } from "../../../types/Direction";
import { ArrowIcon } from "./ArrowIcon";
import { MenuIcon } from "./Menu";

type IconProps = { onPress: () => void };

export const NavIcon = (props: IconProps) => {
    const style = { ...HeaderIconWrap(useTheme().colors), borderRadius: 0, paddingTop: 2 };

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={style}>
                <MenuIcon/>
            </View>
        </TouchableNativeFeedback>
    );
};

export const BackIcon = (props: IconProps) => (
    <ArrowIcon onPress={props.onPress}
               wrapStyle={HeaderIconWrap(useTheme().colors)}
               color={useTheme().colors.color}
               direction={Direction.Left}
               size={25}/>
);
