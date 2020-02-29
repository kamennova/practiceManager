import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { AppSidePadding } from "../../../AppStyle";
import { NavIcon } from "../../icons/NavIcon/NavIcon";

export const AppHeader = () => {
    const nav = useNavigation();

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: 20,
            paddingTop: 45,
            paddingLeft: AppSidePadding,
            paddingRight: AppSidePadding,
        }}>
            <NavIcon navigation={nav}/>
            <Text>
                Welcome back
            </Text>
        </View>
    );
};
