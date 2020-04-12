import { DrawerActions, StackActions } from '@react-navigation/native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { DASHBOARD, REPERTOIRE, SESSION_PLAN_LIST, SESSION_START, SETTINGS } from "../../NavigationPath";
import { ThemeColors } from "../../theme";
import { useTheme } from "../../theme";
import { StartButton } from "./Buttons/ActionButton";
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
        <DrawerContentScrollView {...props}
                                 contentContainerStyle={{ height: '100%', justifyContent: 'center', paddingBottom: 140, paddingLeft: 20 }}>
            <CustomDrawerItem label={'Dashboard'} onPress={jumpTo(DASHBOARD)} icon={<DashboardIcon/>}/>
            <CustomDrawerItem label={'Repertoire'} onPress={jumpTo(REPERTOIRE)} icon={<RepertoireIcon/>}/>
            <CustomDrawerItem label={'Practice plans'} onPress={jumpTo(SESSION_PLAN_LIST)} icon={<PlansIcon/>}/>
            <CustomDrawerItem label={'Settings'} onPress={jumpTo(SETTINGS)} icon={<SettingsIcon/>}/>
            <DrawerItem label={() => <StartButton/>}
                        onPress={push(SESSION_START)}
                        style={{ alignSelf: 'center', position: 'absolute', bottom: 20 }}/>
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

const labelStyle = (colors: ThemeColors) => ({
    color: colors.color,
    fontSize: 18,
    marginLeft: -15,
    marginBottom: 0,
});
