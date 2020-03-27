import React from 'react';
import { Dimensions, View } from "react-native";
import { AppBgOpacity, AppSidePadding } from "../../AppStyle";

export const ItemButtonsWrap = (props: { children: JSX.Element[] }) => (
    <View style={{
        position: 'absolute',
        top: Dimensions.get('window').height - 50,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: AppBgOpacity,
        padding: AppSidePadding,
        paddingTop: 15,
        paddingBottom: 0,
    }}>
        {props.children}
    </View>
);
