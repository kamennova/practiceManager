import React, { Component } from 'react';
import { View } from "react-native";
import { AppHeader } from "../AppHeader";

export const ScreenWrapper = (props: { children: JSX.Element | Component, fullHeight?: boolean }) => (
    <View style={{
        minHeight: props.fullHeight !== undefined && props.fullHeight ? '100%' : 'auto',
    }}>
        <AppHeader/>
        {props.children}
    </View>
);
