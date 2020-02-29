import React from 'react';
import { Text, View } from "react-native";
import { AppSidePadding, BigButtonStyle } from "../../AppStyle";
import { Button } from "../basic/Buttons/Button";

export const StartScreen = () => {
    return (
        <View style={{
            justifyContent: 'center',
            flexGrow: 1,
            paddingLeft: AppSidePadding,
            paddingRight: AppSidePadding
        }}>
            <Button style={BigButtonStyle}>
                <Text style={{
                    fontSize: 16,
                }}>Start session</Text>
            </Button>
        </View>
    );
};
