import React from 'react';
import { TouchableWithoutFeedback, View } from "react-native";

export const NavIcon = (props: {navigation: any}) => (
    <TouchableWithoutFeedback onPress={props.navigation.toggleDrawer}>
    <View style={{

        position: 'relative',
        height: 25,
        width: 25,
        marginRight: 20,
    }}>
            <NavBar n={0}/>
            <NavBar n={1}/>
            <NavBar n={2}/>
    </View>
    </TouchableWithoutFeedback>
);

const NavBar = (props: { n: number }) => (
    <View style={{
        position: 'absolute',
        top: props.n * 6,
        left: 0,
        width: 22,
        height: 2,
        marginTop: 4,
        backgroundColor: 'grey',
    }}/>
);
