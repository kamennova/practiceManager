import React, { useState } from 'react';
import { Dimensions, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { TotalHeaderHeight } from "../../../AppStyle";
import { ItemMenu, MenuOption } from "../ItemMenu";
import { AppHeader } from "./AppHeader";

type WrapperProps = {
    children: JSX.Element | (JSX.Element | undefined)[],
    fullHeight?: boolean,
    title?: string,
    isMain?: boolean,
    itemMenu?: MenuOption[],
    headerStyle?: ViewStyle,
    transparent?: boolean,
}

// todo full height
export const ScreenWrapper = (props: WrapperProps) => {
    const [showMenu, updateShowMenu] = useState(false);

    return (
        <View style={{
            minHeight: props.fullHeight !== undefined && props.fullHeight ? '100%' : 'auto',
            paddingTop: props.transparent ? 0 : TotalHeaderHeight,
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

            <AppHeader transparent={props.transparent}
                       title={props.title}
                       style={props.headerStyle}
                       isMain={props.isMain}
                       updateShowMenu={props.itemMenu !== undefined ? () => updateShowMenu(true) : undefined}/>

            {(props.itemMenu !== undefined && showMenu) ?
                <ItemMenu options={props.itemMenu} prevFunc={() => updateShowMenu(false)}/> : undefined}
        </View>
    )
};
