import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";

type ItemProps = {
    label: string,
    onPress: () => void,
};

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const nav = props.navigation;

    return (
        <DrawerContentScrollView {...props}>
            <CustomDrawerItem label={'Dashboard'} onPress={() => nav.navigate('Dashboard')}/>
            <CustomDrawerItem label={'Repertoire'} onPress={() => nav.navigate('MyPieces')}/>
            <CustomDrawerItem label={'Practice plans'} onPress={() => nav.navigate('SessionPlansList')}/>
            <CustomDrawerItem label={'Settings'} onPress={() => nav.navigate('Settings')}/>
            <CustomDrawerItem label={'Start session'} onPress={() => nav.navigate('SessionStartScreen')}/>
        </DrawerContentScrollView>
    );
};

const CustomDrawerItem = (props: ItemProps) => (
    <DrawerItem
        labelStyle={{
            color: 'black',
            fontSize: 22,
        }}
        label={props.label}
        onPress={props.onPress}/>
);
