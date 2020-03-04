import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { Text, View } from "react-native";
import { SessionScreenStyle } from "../../AppStyle";
import { DASHBOARD } from "../../NavigationPath";
import { ComplexActivity, SimpleActivity } from "../../types/Activity";
import { Button } from "../basic/Buttons/Button";
import { ModalTitle } from "../basic/Titles/ModalTitle";
import { getSessionReport } from "./SessionReport";

export const SessionEndScreen = (props: { history: (SimpleActivity | ComplexActivity)[] }) => {
    const nav = useNavigation();

    return (
        <View style={{ ...SessionScreenStyle }}>
            <ModalTitle style={{ marginTop: 150 }}>
                Well done!
            </ModalTitle>

            <Text>
                You've practiced for {getSessionReport(props.history).totalDuration} minutes
            </Text>
            <Button onPress={() => nav.navigate(DASHBOARD)}>Ok</Button>
        </View>
    );
};
