import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { DrawerContentStyle, DrawerStyle } from "./AppStyle";
import { CustomDrawerContent } from "./components/basic/CustomDrawer";
import { connectToDb } from "./db/connection";
import { Root } from "./StackNavigator";
import { thunkGetPiecesMeta } from "./store/thunks";
import { thunkGetPlans } from "./store/thunks/plan";

const Drawer = createDrawerNavigator();

const MainComponent = (props: { getPieces: () => void, getPlans: () => void }) => {
    useEffect(() => {
        loadDbData();
    });

    const loadDbData = async () => {
        await connectToDb()
            .then(() => props.getPlans())
            .then(() => props.getPieces());
    };

    return (
        <NavigationContainer>
            <Drawer.Navigator
                sceneContainerStyle={{ height: '100%' }}
                drawerStyle={DrawerStyle()}
                drawerContentOptions={{ contentContainerStyle: DrawerContentStyle }}
                drawerContent={props => (<CustomDrawerContent {...props} />)}>
                <Drawer.Screen name='Root' component={Root}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    getPieces: () => dispatch(thunkGetPiecesMeta()),
    getPlans: () => dispatch(thunkGetPlans())
});

export const Main = connect(undefined, mapDispatchToProps)(MainComponent);
