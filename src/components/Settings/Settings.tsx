import React from 'react';
import { Text, View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { ScreenWrapper } from "../basic/ScreenWrapper";

export const AppSettings = () => {
    return (
        <ScreenWrapper title='Settings'>
            <View style={{
                ...AppPaddingStyle,
            }}>
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
