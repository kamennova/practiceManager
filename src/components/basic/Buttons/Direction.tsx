import React from 'react';
import { Image, TouchableHighlight, View } from "react-native";
import { DirectionButtonStyle } from "../../../AppStyle";
import { useTheme } from "../../../theme";

type NavBtnProps = {
    onPress?: () => void
};

export const PrevButton = (props: NavBtnProps) => (
    <TouchableHighlight onPress={props.onPress}>
        <View style={DirectionButtonStyle(useTheme().colors, props.onPress === undefined)}>
            <Image style={{ width: 20, height: 20 }} source={require('../../../../assets/left.png')}/>
        </View>
    </TouchableHighlight>
);

export const NextButton = (props: NavBtnProps) => (
    <TouchableHighlight onPress={props.onPress}>
        <View style={DirectionButtonStyle(useTheme().colors, props.onPress === undefined)}>
            <Image style={{ transform: [{rotate: '180deg'}], width: 20, height: 20 }} source={require('../../../../assets/left.png')}/>
        </View>
    </TouchableHighlight>
);
