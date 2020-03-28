import React, { useState } from 'react';
import { TouchableWithoutFeedback, View } from "react-native";
import { DotsIcon } from "./icons/Header";
import { ItemMenu, MenuOption } from "./ItemMenu";
import { useNavigation } from "@react-navigation/native";

type WrapperProps = {
    children: JSX.Element | (JSX.Element | undefined)[],
    itemMenu?: MenuOption[],
}

export const ScreenWrapper = (props: WrapperProps) => {
    const [showMenu, updateShowMenu] = useState(false);

    if (props.itemMenu !== undefined) {
        useNavigation().setOptions({
            headerRight: () => (
                <View>
                    {showMenu ? undefined : <DotsIcon onPress={() => updateShowMenu(true)}/>}
                </View>
            ),
        });
    }

    return (
        <View style={{ minHeight: '100%' }}>
            {props.children}
            {showMenu ?
                [<Layer onPress={() => updateShowMenu(false)}/>,
                    <ItemMenu prevFunc={() => updateShowMenu(false)} options={props.itemMenu}/>]
                : undefined}
        </View>
    )
};

const Layer = (props: { onPress: () => void }) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
        }}/>
    </TouchableWithoutFeedback>);
