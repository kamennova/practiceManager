import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import { AppBg, DrawerContentStyle, DrawerStyle } from "./AppStyle";

import { CustomDrawerContent } from "./components/basic/CustomDrawer";
import { Dashboard } from "./components/Dashboard";
import { PieceForm } from "./components/Pieces/PieceForm";
import { PieceScreen } from "./components/Pieces/PieceScreen";
import RepertoireScreen from "./components/Pieces/RepertoireScreen";
import { SessionPlanScreen } from "./components/SessionPlan";
import { SessionPlanForm } from "./components/SessionPlan/SessionPlanForm";
import SessionPlansList from "./components/SessionPlan/SessionPlansList";
import { FreeSessionTimer, PlannedSessionTimer, SessionEndScreen } from "./components/SessionTimer";
import { FreeSessionActivityChoice } from "./components/SessionTimer/FreeSessionActivityChoice";
import { SessionStartScreen } from "./components/SessionTimer/SessionStartScreen";
import { AppSettings } from "./components/Settings/Settings";
import { StartScreen } from "./components/StartScreen";
import {
    DASHBOARD,
    FREE_SESSION_ACTIVITY_CHOICE,
    FREE_SESSION_TIMER,
    INITIAL_SCREEN,
    PIECE,
    PIECE_FORM,
    PLANNED_SESSION_TIMER,
    REPERTOIRE,
    SESSION_END,
    SESSION_PLAN,
    SESSION_PLAN_FORM,
    SESSION_PLAN_LIST,
    SESSION_START,
    SETTINGS,
    START_SCREEN
} from "./NavigationPath";

const Drawer = createDrawerNavigator();

export const Main = () => (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName={INITIAL_SCREEN}
                          sceneContainerStyle={{ backgroundColor: AppBg }}
                          drawerContentOptions={{ contentContainerStyle: DrawerContentStyle }}
                          backBehavior={'history'}
                          drawerStyle={DrawerStyle}
                          drawerContent={props => (<CustomDrawerContent {...props} />)}>
            <Drawer.Screen name={START_SCREEN} component={StartScreen}/>

            <Drawer.Screen name={REPERTOIRE}
                           component={RepertoireScreen}/>
            <Drawer.Screen name={PIECE} component={PieceScreen}/>
            <Drawer.Screen name={PIECE_FORM} component={PieceForm}/>

            <Drawer.Screen name={SESSION_PLAN_LIST}
                           component={SessionPlansList}/>
            <Drawer.Screen name={SESSION_PLAN} component={SessionPlanScreen}/>
            <Drawer.Screen name={SESSION_PLAN_FORM} component={SessionPlanForm}/>

            <Drawer.Screen name={SESSION_START} component={SessionStartScreen}/>

            <Drawer.Screen name={PLANNED_SESSION_TIMER} component={PlannedSessionTimer}/>
            <Drawer.Screen name={FREE_SESSION_TIMER} component={FreeSessionTimer}/>
            <Drawer.Screen name={FREE_SESSION_ACTIVITY_CHOICE} component={FreeSessionActivityChoice}/>
            <Drawer.Screen name={SESSION_END} component={SessionEndScreen}/>

            <Drawer.Screen name={DASHBOARD} component={Dashboard}/>
            <Drawer.Screen name={SETTINGS} component={AppSettings}/>
        </Drawer.Navigator>
    </NavigationContainer>
);
