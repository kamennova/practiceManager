import React from 'react';
import { Image, TouchableWithoutFeedback, View } from "react-native";
import { HeaderIconWrap } from "../../../AppStyle";

export const NavIcon = (props: { navigation: any }) => (
    <TouchableWithoutFeedback onPress={props.navigation.toggleDrawer}>
        <View style={{ ...HeaderIconWrap, borderRadius: 0, paddingTop: 2 }}>
            <Image source={require('../../../../assets/menu.png')}/>
        </View>
    </TouchableWithoutFeedback>
);
