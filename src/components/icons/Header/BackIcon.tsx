import React from 'react';
import { Image, TouchableWithoutFeedback, View } from "react-native";
import { HeaderIconWrap } from "../../../AppStyle";

export const BackIcon = (props: { navigation: any }) => (
    <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
        <View style={HeaderIconWrap}>
            <Image  style={{width :20, height: 20}} source={require('../../../../assets/arrow.png')}/>
        </View>
    </TouchableWithoutFeedback>
);
