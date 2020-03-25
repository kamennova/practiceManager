import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { AppHeaderStyle } from "../../../AppStyle";
import { BackIcon, DotsIcon, NavIcon } from "../../icons/Header";

type HeaderProps = {
    title?: string,
    isMain?: boolean,
    updateShowMenu?: () => void,
    style?: ViewStyle,
};

export const AppHeader = (props: HeaderProps) => {
    const nav = useNavigation();

    return (
        <View style={{ ...AppHeaderStyle, ...props.style }}>

            {(props.isMain !== undefined && !props.isMain) ?
                <BackIcon navigation={nav}/> : <NavIcon navigation={nav}/>
            }

            <Text style={{
                color: 'black',
                fontSize: 20,
                marginLeft: 17,
            }}>{props.title}</Text>

            {props.updateShowMenu !== undefined ? <DotsIcon onPress={props.updateShowMenu}/> : undefined}
        </View>
    );
};
