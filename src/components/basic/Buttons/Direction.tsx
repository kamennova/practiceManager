import React from 'react';
import { Image, TouchableWithoutFeedback, View } from "react-native";
import { DirectionButtonStyle } from "../../../AppStyle";

type NavBtnProps = {
    onPress?: () => void
};

export const PrevButton = (props: NavBtnProps) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={DirectionButtonStyle}>
            <Image style={{ width: 20, height: 20 }} source={require('../../../../assets/left.png')}/>
        </View>
    </TouchableWithoutFeedback>
);

export const NextButton = (props: NavBtnProps) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={DirectionButtonStyle}>
            <Image style={{ transform: [{rotate: '180deg'}], width: 20, height: 20 }} source={require('../../../../assets/left.png')}/>
        </View>
    </TouchableWithoutFeedback>
);
