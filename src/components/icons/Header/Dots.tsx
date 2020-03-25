import React from "react";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import { HeaderIconWrap } from "../../../AppStyle";

export const DotsIcon = (props: { onPress?: () => void }) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={{
            ...HeaderIconWrap,
            marginLeft: 'auto'
        }}>
            <Image style={{ width: 25, height: 25 }} source={require('../../../../assets/dots.png')}/>
        </View>
    </TouchableWithoutFeedback>
);

