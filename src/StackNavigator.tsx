import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AppHeaderStyle, AppSidePadding } from "./AppStyle";
import { BackIcon, NavIcon } from "./components/basic/icons/Header";
import { Dashboard } from "./components/Dashboard";
import { PieceForm } from "./components/Pieces/PieceForm";
import PieceScreen from "./components/Pieces/PieceScreen";
import { RepertoireScreen } from "./components/Pieces/RepertoireScreen";
import { SessionPlanScreen } from "./components/SessionPlan";
import { SessionPlanForm } from "./components/SessionPlan/SessionPlanForm";
import SessionPlansList from "./components/SessionPlan/SessionPlansList";
import {
    FreeBreakTimer,
    FreeSessionTimer,
    PlannedSessionTimer,
    SessionActivityChoice,
    SessionEndScreen
} from "./components/SessionTimer";
import { SessionStartScreen } from "./components/SessionTimer/SessionStartScreen";
import { AppSettings } from "./components/Settings/Settings";
import {
    DASHBOARD,
    FREE_BREAK_TIMER,
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
    SETTINGS
} from "./NavigationPath";
import { ThemeColors, useTheme } from "./theme";
import { MyTransition } from "./Transition";
import { ActionType } from "./types/ActionType";

const Stack = createStackNavigator();

const options = (colors: ThemeColors) => ({
    cardStyle: { backgroundColor: colors.appBg },
    headerStyle: AppHeaderStyle(colors),
    headerTitleStyle: { fontWeight: '500', fontFamily: 'Roboto', color: colors.color, marginLeft: -4 },
    headerLeftContainerStyle: { paddingLeft: AppSidePadding },
    headerRightContainerStyle: { paddingRight: AppSidePadding },
});

const timerOptions = { title: '', headerTransparent: true, headerLeft: () => '' };

export const Root = () => (
    <Stack.Navigator
        screenOptions={{
            ...options(useTheme().colors),
            cardOverlayEnabled: true,
            gestureEnabled: true,
            ...MyTransition,
        }}
        initialRouteName={INITIAL_SCREEN}>

        <Stack.Screen
            options={({ navigation }) => ({
                title: 'Pieces',
                headerLeft: () => <NavIcon onPress={() => navigation.toggleDrawer()}/>,
            })}
            name={REPERTOIRE}
            component={RepertoireScreen}/>

        <Stack.Screen name={PIECE} component={PieceScreen}
                      options={({ navigation }) => ({
                          title: '',
                          headerLeft: () => <BackIcon onPress={() => navigation.navigate(REPERTOIRE)}/>,
                          headerTransparent: true,
                      })}/>
        <Stack.Screen name={PIECE_FORM} component={PieceForm}
                      options={({ navigation, route }) => ({
                          headerTransparent: true,
                          headerLeft: () => <BackIcon onPress={() => navigation.pop()}/>,
                          title: route.params?.mode === ActionType.Edit ? 'Edit piece' : 'Add piece',
                      })}/>

        <Stack.Screen name={SESSION_PLAN_LIST} component={SessionPlansList}
                      options={({ navigation }) => ({
                          title: 'Practice plans',
                          headerLeft: () => <NavIcon onPress={() => navigation.toggleDrawer()}/>,
                      })}/>
        <Stack.Screen name={SESSION_PLAN} component={SessionPlanScreen}
                      options={({ navigation }) => ({
                          title: '',
                          headerLeft: () => <BackIcon onPress={() => navigation.navigate(SESSION_PLAN_LIST)}/>,
                          headerTransparent: true,
                      })}/>
        <Stack.Screen name={SESSION_PLAN_FORM} component={SessionPlanForm}
                      options={({ route, navigation }) => ({
                          title: route.params?.mode === ActionType.Edit ? 'Edit plan' : 'Add plan',
                          headerLeft: () => <BackIcon onPress={() => navigation.pop()}/>,
                      })}/>

        <Stack.Screen name={SESSION_START} component={SessionStartScreen}
                      options={({ navigation }) => ({
                          title: '', headerTransparent: true,
                          headerLeft: () => <BackIcon onPress={() => navigation.pop()}/>,
                      })}/>

        <Stack.Screen name={PLANNED_SESSION_TIMER} component={PlannedSessionTimer} options={timerOptions}/>
        <Stack.Screen name={FREE_SESSION_TIMER} component={FreeSessionTimer} options={timerOptions}/>
        <Stack.Screen name={FREE_BREAK_TIMER} component={FreeBreakTimer} options={timerOptions}/>
        <Stack.Screen name={FREE_SESSION_ACTIVITY_CHOICE} component={SessionActivityChoice}
                      options={{ title: '', headerTransparent: true }}/>
        <Stack.Screen name={SESSION_END} component={SessionEndScreen}
                      options={{ title: '', headerTransparent: true, headerLeft: '' }}/>

        <Stack.Screen name={DASHBOARD} component={Dashboard}
                      options={({ navigation }) => ({
                          headerLeft: () => <NavIcon onPress={() => navigation.toggleDrawer()}/>,
                      })}/>
        <Stack.Screen name={SETTINGS} component={AppSettings}
                      options={({ navigation }) => ({
                          headerLeft: () => <NavIcon onPress={() => navigation.toggleDrawer()}/>,
                      })}/>
    </Stack.Navigator>
);
