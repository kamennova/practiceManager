import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { DrawerContentStyle, DrawerStyle } from "./AppStyle";
import { CustomDrawerContent } from "./components/basic/CustomDrawer";
import { setUpDb } from "./db/Setup";
import { Root } from "./StackNavigator";
import { thunkGetPiecesMeta } from "./store/thunks";
import { thunkGetPlans } from "./store/thunks/plan";
import { thunkGetSessions } from "./store/thunks/session";
import { useTheme } from "./theme";

const Drawer = createDrawerNavigator();

const MainComponent = (props: { getPieces: () => void, getPlans: () => void, getSessions: () => void, }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            loadDbData();
        }

    }, [isLoading]);

    const loadDbData = async () => {
        await setUpDb()
            .then(() => props.getPieces())
            .then(() => props.getPlans())
            .then(() => props.getSessions())
            .then(() => setIsLoading(false));
    };

    return (
        <NavigationContainer>
            <Drawer.Navigator
                sceneContainerStyle={{ height: '100%' }}
                drawerStyle={DrawerStyle(useTheme().colors)}
                drawerContentOptions={{ contentContainerStyle: DrawerContentStyle }}
                drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name='Root' component={Root}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    getPieces: () => dispatch(thunkGetPiecesMeta()),
    getSessions: () => dispatch(thunkGetSessions()),
    getPlans: () => dispatch(thunkGetPlans()),
});

export const Main = connect(undefined, mapDispatchToProps)(MainComponent);
