import React, { Component, useState } from 'react';
import { Dimensions, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { TotalHeaderHeight } from "../../../AppStyle";
import { AppHeader } from "./AppHeader";

type WrapperProps = {
    children: JSX.Element | Component,
    fullHeight?: boolean,
    title?: string,
    isMain?: boolean,
    itemMenu?: JSX.Element,
    headerStyle?: ViewStyle
}

// todo full height
export const ScreenWrapper = (props: WrapperProps) => {
    const [showMenu, updateShowMenu] = useState(false);

    return (
        <View style={{
            minHeight: props.fullHeight !== undefined && props.fullHeight ? '100%' : 'auto',
            paddingTop: TotalHeaderHeight,
        }}>
            {props.children}

            {showMenu ?
                <TouchableWithoutFeedback onPress={() => updateShowMenu(false)}>
                    <View style={{
                        height: Dimensions.get('window').height,
                        width: '100%',
                        position: 'absolute',
                        top: TotalHeaderHeight,
                    }}/>
                </TouchableWithoutFeedback> : undefined}

            <AppHeader title={props.title} style={props.headerStyle} isMain={props.isMain}
                       updateShowMenu={props.itemMenu !== undefined ? () => updateShowMenu(true) : undefined}/>

            {(props.itemMenu !== undefined && showMenu) ? props.itemMenu : undefined}
        </View>
    )
};
