import { StackActions } from '@react-navigation/native';
import React from 'react';
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { FullScreenModalStyle } from "../../AppStyle";
import { DASHBOARD } from "../../NavigationPath";
import { SessionState, StateShape } from "../../store/StoreState";
import { getActivitiesReport } from "../../types/ActivitiesReport";
import { Button } from "../basic/Buttons/Button";
import { ModalTitle } from "../basic/Titles/ModalTitle";

type SessionEndProps = {
    session: SessionState,
    navigation: any,
};

const SessionEnd = (props: SessionEndProps) => {
    const report = getActivitiesReport([]);

    return (
        <View style={{ ...FullScreenModalStyle }}>
            <ModalTitle> Well done! </ModalTitle>

            <Text>
                You've practiced for {report.totalDuration} minutes
            </Text>
            <Button onPress={() => props.navigation.dispatch(StackActions.replace(DASHBOARD))}>Ok</Button>
        </View>
    );
};

const mapStateToProps = (state: StateShape) => ({
    session: state.session,
});

export const SessionEndScreen = connect(mapStateToProps)(SessionEnd);
