import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import React from 'react';
import { AppHeaderStyle, AppSidePadding, DrawerContentStyle, DrawerStyle } from "./AppStyle";
import { CustomDrawerContent } from "./components/basic/CustomDrawer";
import { NavIcon } from "./components/basic/icons/Header";
import { Dashboard } from "./components/Dashboard";
import { PieceForm } from "./components/Pieces/PieceForm";
import PieceScreen from "./components/Pieces/PieceScreen";
import RepertoireScreen from "./components/Pieces/RepertoireScreen";
import { SessionPlanScreen } from "./components/SessionPlan";
import { SessionPlanForm } from "./components/SessionPlan/SessionPlanForm";
import SessionPlansList from "./components/SessionPlan/SessionPlansList";
import { FreeSessionTimer, PlannedSessionTimer, SessionEndScreen } from "./components/SessionTimer";
import { FreeSessionActivityChoice } from "./components/SessionTimer/FreeSessionActivityChoice";
import { SessionStartScreen } from "./components/SessionTimer/SessionStartScreen";
import { AppSettings } from "./components/Settings/Settings";
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
} from "./NavigationPath";
import { MyTransition } from "./Transition";
import { ActionType } from "./types/ActionType";

const options = {
    headerStyle: AppHeaderStyle(),
    headerTitleStyle: { fontWeight: '500', fontFamily: 'Roboto' },
    headerLeftContainerStyle: { paddingLeft: AppSidePadding },
    headerRightContainerStyle: { paddingRight: AppSidePadding },
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const Main = () => (
    <NavigationContainer>
        <Drawer.Navigator
            drawerStyle={DrawerStyle}
            drawerContentOptions={{ contentContainerStyle: DrawerContentStyle }}
            drawerContent={props => (<CustomDrawerContent {...props} />)}>
            <Drawer.Screen name='Root' component={Root}/>
        </Drawer.Navigator>
    </NavigationContainer>
);

const Root = () => (
    <Stack.Navigator
        screenOptions={{
            ...options,
            cardOverlayEnabled: true,
            gestureEnabled: true,
            ...MyTransition,
        }}
        initialRouteName={INITIAL_SCREEN}>

        <Stack.Screen
            options={({ navigation }) => ({ headerLeft: () => <NavIcon onPress={() => navigation.toggleDrawer()}/>, })}
            name={REPERTOIRE}
            component={RepertoireScreen}/>

        <Stack.Screen name={PIECE} component={PieceScreen}
                      options={({ navigation }) => ({
                          title: '',
                          headerLeft: () => <HeaderBackButton onPress={() => navigation.navigate(REPERTOIRE)}/>,
                          headerTransparent: true,
                      })}/>
        <Stack.Screen name={PIECE_FORM} component={PieceForm}
                      options={({ route }) => ({
                          headerTransparent: true,
                          title: route.params?.mode === ActionType.Edit ? 'Edit piece' : 'Add piece',
                      })}/>

        <Stack.Screen name={SESSION_PLAN_LIST} component={SessionPlansList}
                      options={({ navigation }) => ({
                          title: 'Practice plans',
                          headerLeft: () => <NavIcon onPress={() => navigation.toggleDrawer()}/>,
                      })}/>
        <Stack.Screen name={SESSION_PLAN} component={SessionPlanScreen}/>
        <Stack.Screen name={SESSION_PLAN_FORM} component={SessionPlanForm} options={({ route }) =>
            ({ title: route.params?.mode === ActionType.Edit ? 'Edit plan' : 'Add plan', })}/>

        <Stack.Screen name={SESSION_START} component={SessionStartScreen}
                      options={{ title: '', headerTransparent: true }}/>

        <Stack.Screen name={PLANNED_SESSION_TIMER} component={PlannedSessionTimer}
                      options={{ title: '', headerTransparent: true }}/>
        <Stack.Screen name={FREE_SESSION_TIMER} component={FreeSessionTimer}
                      options={{ title: '', headerTransparent: true }}/>
        <Stack.Screen name={FREE_SESSION_ACTIVITY_CHOICE} component={FreeSessionActivityChoice}
                      options={{ title: '', headerTransparent: true }}/>
        <Stack.Screen name={SESSION_END} component={SessionEndScreen}
                      options={{ title: '', headerTransparent: true }}/>

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
