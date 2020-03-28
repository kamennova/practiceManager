import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { TouchableWithoutFeedback, View } from "react-native";
import { DotsIcon } from "./icons/Header";
import { ItemFav } from "./ItemFav";
import { ItemMenu, MenuOption } from "./ItemMenu";

type WrapperProps = {
    children: JSX.Element | (JSX.Element | undefined)[],
    itemMenu?: MenuOption[],
    fav?: {
        update: () => void,
        val: boolean,
    },
}

export const ScreenWrapper = (props: WrapperProps) => {
    const [showMenu, updateShowMenu] = useState(false);

    useNavigation().setOptions({
        headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {props.fav !== undefined && !showMenu ?
                    <ItemFav isFav={props.fav.val} onPress={props.fav.update}/> : undefined}
                {(props.itemMenu !== undefined && !showMenu) ?
                    <DotsIcon onPress={() => updateShowMenu(true)}/> : undefined}
            </View>
        ),
    });

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
