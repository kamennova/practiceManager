import { StackActions } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Text, View } from "react-native";
import { connect } from "react-redux";
import { SessionState, StateShape } from "../../store/StoreState";
import { ActivitiesReport, getActivitiesReport } from "../../types/ActivitiesReport";
import { PlanActivity } from "../../types/PlanActivity";
import { secondsToHumanlyFormat } from "../../utils/time";
import { PrimaryButton } from "../basic/Buttons/Button";
import { ModalTitle } from "../basic/Titles/ModalTitle";

type SessionEndProps = {
    session: SessionState,
    navigation: any,
};

const SessionEnd = (props: SessionEndProps) => {
    const activities = getActivities(props.session);
    const report = getActivitiesReport(activities);

    return (
        <View style={{
            minHeight: Dimensions.get('screen').height,
            width: '100%'
        }}>
            <View style={{
                alignItems: 'center',
                alignContent: 'center',
                marginTop: 'auto',
                marginBottom: 'auto'
            }}>
                <ModalTitle> Well done! </ModalTitle>

                <SessionStats report={report}/>

                <Text style={{ marginTop: 20, marginBottom: 120 }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold'
                    }}> {secondsToHumanlyFormat(report.totalDuration)}</Text> in total
                </Text>

                <PrimaryButton onPress={() => props.navigation.dispatch(StackActions.pop())}>Ok</PrimaryButton>
            </View>
        </View>
    );
};

const SessionStats = (props: { report: ActivitiesReport }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
        <ActivityStats label={'Technique'} duration={props.report.technique}/>
        <ActivityStats label={'Pieces'} duration={props.report.pieces}/>
        <ActivityStats label={'Sight-reading'} duration={props.report.sightReading}/>
    </View>

);

const ActivityStats = (props: { label: string, duration: number, isLast?: boolean }) => {
    return (
        <View style={{ paddingLeft: 6, paddingRight: 7, alignItems: 'center', marginRight: props.isLast ? 0 : 15 }}>
            <Text
                style={{ fontSize: 23, fontWeight: 'bold' }}>{secondsToHumanlyFormat(Math.floor(props.duration))}</Text>
            <Text style={{ fontSize: 14 }}>{props.label}</Text>
        </View>
    );
};

const getActivities = (session: SessionState): PlanActivity[] =>
    session.history.map((act, i) => ({
        ...act,
        duration: Math.floor(
            ((i !== session.history.length - 1 ? session.history[i + 1].startedOn : (session.finishedOn || 0))
                - act.startedOn) / 1000),
    }));

const mapStateToProps = (state: StateShape) => ({
    session: state.session,
});

export const SessionEndScreen = connect(mapStateToProps)(SessionEnd);
