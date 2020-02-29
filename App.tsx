import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import { AppBg, DrawerContentStyle, DrawerStyle } from "./AppStyle";
import { SessionStartModal } from "./components/basic/Modals/SessionStartModal";
import { CustomDrawerContent } from "./components/basic/Navigation/CustomDrawer";
import { Dashboard } from "./components/Dashboard";
import { PieceScreen } from "./components/Pieces/PieceScreen";
import { RepertoireScreen } from "./components/Pieces/RepertoireScreen";
import { SessionPlanScreen, SessionPlansList } from "./components/SessionPlan";
import { SessionPlanForm } from "./components/SessionPlan/SessionPlanForm";
import { FreeSessionActivityChoice } from "./components/SessionTimer/FreeSessionActivityChoice";
import { FreeSessionTimer } from "./components/SessionTimer/FreeSessionTimer";
import { PlannedSessionScreen } from "./components/SessionTimer/PlannedSessionScreen";
import { SessionEndScreen } from "./components/SessionTimer/SessionEndScreen";
import { AppSettings } from "./components/Settings/Settings";
import { StartScreen } from "./components/StartScreen";
import { pieces, plans } from "./exampleData";

const Drawer = createDrawerNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Dashboard'
                              sceneContainerStyle={{ backgroundColor: AppBg }}
                              drawerContentOptions={{ contentContainerStyle: DrawerContentStyle }}
                              backBehavior={'history'}
                              drawerStyle={DrawerStyle}
                              drawerContent={props => (<CustomDrawerContent {...props} />)}>
                <Drawer.Screen name={'StartScreen'} component={StartScreen}/>

                <Drawer.Screen name={'Repertoire'} component={RepertoireScreen.bind(undefined, { pieces: pieces })}/>
                <Drawer.Screen name={'Piece'} component={PieceScreen}/>

                <Drawer.Screen name={'SessionPlansList'}
                               component={SessionPlansList.bind(undefined, { plans: plans })}/>
                <Drawer.Screen name={'SessionPlan'} component={SessionPlanScreen}/>
                <Drawer.Screen name={'SessionPlanForm'} component={SessionPlanForm}/>
                <Drawer.Screen name={'SessionStartModal'} component={SessionStartModal}/>

                <Drawer.Screen name={'PlannedSessionScreen'} component={PlannedSessionScreen}/>
                <Drawer.Screen name={'FreeSessionTimer'} component={FreeSessionTimer}/>
                <Drawer.Screen name={'FreeSessionActivityChoice'} component={FreeSessionActivityChoice}/>
                <Drawer.Screen name={'SessionEndScreen'} component={SessionEndScreen}/>

                <Drawer.Screen name={'Dashboard'} component={Dashboard}/>
                <Drawer.Screen name={'Settings'} component={AppSettings}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
