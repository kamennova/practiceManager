import { DrawerActions, StackActions } from '@react-navigation/native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { DASHBOARD, REPERTOIRE, SESSION_PLAN_LIST, SESSION_START, SETTINGS } from "../../NavigationPath";

type ItemProps = {
    label: string,
    onPress: () => void,
};

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const nav = props.navigation;

    const jumpTo = (path: string) => () => {
        nav.dispatch(DrawerActions.closeDrawer());
        nav.dispatch(StackActions.replace(path));
    };

    return (
        <DrawerContentScrollView {...props}>
            <CustomDrawerItem label={'Dashboard'} onPress={jumpTo(DASHBOARD)}/>
            <CustomDrawerItem label={'Repertoire'} onPress={jumpTo(REPERTOIRE)}/>
            <CustomDrawerItem label={'Practice plans'} onPress={jumpTo(SESSION_PLAN_LIST)}/>
            <CustomDrawerItem label={'Settings'} onPress={jumpTo(SETTINGS)}/>
            <CustomDrawerItem label={'Start session'} onPress={jumpTo(SESSION_START)}/>
        </DrawerContentScrollView>
    );
};

const CustomDrawerItem = (props: ItemProps) => (
    <DrawerItem labelStyle={labelStyle} label={props.label} onPress={props.onPress}/>
);

const labelStyle = {
    color: 'black',
    fontSize: 22,
};
