import React from 'react';
import { Image, TouchableNativeFeedback, TouchableWithoutFeedback, View } from "react-native";
import { HeaderIconWrap } from "../../../AppStyle";

type IconProps = { onPress: () => void };

export const DotsIcon = (props: IconProps) => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <View style={{
            ...HeaderIconWrap,
            marginLeft: 'auto'
        }}>
            <Image style={{ width: 25, height: 25 }} source={require('../../../../assets/dots.png')}/>
        </View>
    </TouchableNativeFeedback>
);

export const NavIcon = (props: IconProps) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={{ ...HeaderIconWrap, borderRadius: 0, paddingTop: 2 }}>
            <Image source={require('../../../../assets/menu.png')}/>
        </View>
    </TouchableWithoutFeedback>
);
