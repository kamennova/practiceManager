import React, { Component } from 'react';
import { View } from "react-native";
import { AppHeader } from "../AppHeader";

export const ScreenWrapper = (props: { children: JSX.Element | Component }) => (
    <View>
        <AppHeader/>
        {props.children}
    </View>
);
