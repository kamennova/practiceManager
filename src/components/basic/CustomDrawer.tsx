import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { DASHBOARD, REPERTOIRE, SESSION_PLAN_LIST, SESSION_START, SETTINGS } from "../../NavigationPath";

type ItemProps = {
    label: string,
    onPress: () => void,
};

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const nav = props.navigation;

    return (
        <DrawerContentScrollView {...props}>
            <CustomDrawerItem label={'Dashboard'} onPress={() => nav.navigate(DASHBOARD)}/>
            <CustomDrawerItem label={'Repertoire'} onPress={() => nav.navigate(REPERTOIRE)}/>
            <CustomDrawerItem label={'Practice plans'} onPress={() => nav.navigate(SESSION_PLAN_LIST)}/>
            <CustomDrawerItem label={'Settings'} onPress={() => nav.navigate(SETTINGS)}/>
            <CustomDrawerItem label={'Start session'} onPress={() => nav.navigate(SESSION_START)}/>
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
