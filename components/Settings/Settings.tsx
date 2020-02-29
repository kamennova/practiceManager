import React from 'react';
import { Text, View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { ScreenTitle } from "../basic/Titles/Titles";

export const AppSettings = () => {
    return (
        <ScreenWrapper>
            <View style={{
                ...AppPaddingStyle,
            }}>
                <ScreenTitle>
                    Settings
                </ScreenTitle>
                <View>
                    <Text>
                        Theme
                    </Text>
                    <Text>
                        Profile
                    </Text>
                    <Text>
                        Notifs
                    </Text>
                </View>
            </View>
        </ScreenWrapper>
    );
};
