import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerActions, StackActions } from '@react-navigation/native';
import React from "react";
import { StyleSheet } from "react-native";
import { DASHBOARD, REPERTOIRE, SESSION_PLAN_LIST, SESSION_START, SETTINGS } from "../../NavigationPath";
import { ThemeColors, useTheme } from "../../theme";
import { StartButton } from "./buttons/ActionButton";
import { DashboardIcon, PlansIcon, RepertoireIcon, SettingsIcon } from "./icons/Drawer";

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const nav = props.navigation;

    const jumpTo = (path: string) => () => {
        nav.dispatch(DrawerActions.closeDrawer());
        nav.dispatch(StackActions.replace(path));
    };

    const push = (path: string) => () => {
        nav.dispatch(DrawerActions.closeDrawer());
        nav.dispatch(StackActions.push(path));
    };

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={drawerStyle.container}>
            <CustomDrawerItem label={'Dashboard'} onPress={jumpTo(DASHBOARD)} icon={<DashboardIcon/>}/>
            <CustomDrawerItem label={'Pieces'} onPress={jumpTo(REPERTOIRE)} icon={<RepertoireIcon/>}/>
            <CustomDrawerItem label={'Practice plans'} onPress={jumpTo(SESSION_PLAN_LIST)} icon={<PlansIcon/>}/>
            <CustomDrawerItem label={'Settings'} onPress={jumpTo(SETTINGS)} icon={<SettingsIcon/>}/>
            <DrawerItem label={() => <StartButton onPress={push(SESSION_START)}/>}
                        onPress={push(SESSION_START)} style={drawerStyle.btnWrap}/>
        </DrawerContentScrollView>
    );
};

type ItemProps = {
    label: string,
    icon: JSX.Element,
    onPress: () => void,
};

const CustomDrawerItem = (props: ItemProps) => (
    <DrawerItem icon={() => props.icon}
                style={{ marginBottom: 0 }}
                labelStyle={labelStyle(useTheme().colors)}
                label={props.label}
                onPress={props.onPress}/>
);

const drawerStyle = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        paddingBottom: 140,
        paddingLeft: 20,
    },
    btnWrap: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20,
    },
});

const labelStyle = (colors: ThemeColors) => ({
    color: colors.color,
    fontSize: 18,
    marginLeft: -15,
    marginBottom: 0,
});
