import React from 'react';
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { AppPaddingStyle } from "../../AppStyle";
import { StateShape } from "../../store/StoreState";
import { PieceBase } from "../../types/piece";
import { Session } from "../../types/Session";
import { ScreenWrapper } from "../basic/ScreenWrapper";

type DashboardProps = {
    pieces: PieceBase[],
    journal: Session[],
};

const _Dashboard = (props: DashboardProps) => {
    return (
        <ScreenWrapper>
            <View style={{
                ...AppPaddingStyle,
                paddingTop: 15,
            }}>
                <Text>
                    Pieces number: {props.pieces.length}
                    Sessions number: {props.journal.length}
                </Text>
            </View>
        </ScreenWrapper>
    );
};

const mapStateToProps = (state: StateShape) => ({
    journal: state.sessions.items,
    pieces: state.pieces.items,
});

export const Dashboard = connect(mapStateToProps)(_Dashboard);
