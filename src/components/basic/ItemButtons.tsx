import React from 'react';
import { Dimensions, View } from "react-native";
import { AppBgOpacity } from "../../AppStyle";

export const ItemButtonsWrap = (props: { children: JSX.Element[] }) => (
    <View style={{
        position: 'absolute',
        top: Dimensions.get('window').height - 50,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: AppBgOpacity,
        paddingTop: 15,
    }}>
        {props.children}
    </View>
);
