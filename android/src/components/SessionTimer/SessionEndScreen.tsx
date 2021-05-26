import { StackActions } from '@react-navigation/native';
import { secondsToHumanlyFormat } from "common/utils/time";
import React from 'react';
import { Dimensions, Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Font } from "../../sizes";
import { StateShape } from "../../store/StoreState";
import { useTheme } from "../../theme";
import { ThemeColors } from "../../theme/colors";
import { ActivitiesReport, getActivitiesReport } from "../../types/activity";
import { Session } from "../../types/Session";
import { DeviceSize, useDeviceSize } from "../basic/adaptive/query";
import { Button } from "../basic/buttons/Button";
import { ModalTitle } from "../basic/titles/ModalTitle";

type SessionEndProps = {
    session: Session,
    navigation: any,
};

const SessionEnd = (props: SessionEndProps) => {
    const report = getActivitiesReport(props.session.history);
    const colors = useTheme().colors;
    const size = useDeviceSize();

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

                <Text style={{ marginTop: 40, marginBottom: 120, color: colors.color, fontSize: Font.Big[size] }}>
                    <Text style={{
                        fontWeight: 'bold'
                    }}> {secondsToHumanlyFormat(report.totalDuration)}</Text> in total
                </Text>

                <Button onPress={() => props.navigation.dispatch(StackActions.pop())} label='Ok'/>
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
    const colors = useTheme().colors;
    const size = useDeviceSize();
    const style = getStyles(colors, size, props.isLast);

    return (
        <View style={style.wrap}>
            <Text style={style.value}>{secondsToHumanlyFormat(Math.floor(props.duration))}</Text>
            <Text style={style.label}>{props.label}</Text>
        </View>
    );
};

const getStyles = (colors: ThemeColors, size: DeviceSize, isLast?: boolean) => StyleSheet.create({
    wrap: {
         paddingLeft: 6,
        paddingRight: 7,
        alignItems: 'center',
        marginRight: isLast ? 0 : (size > DeviceSize.Small ? 24 : 15),
    },
    value: {
        color: colors.color,
        fontSize: Font.Big[size],
        fontWeight: 'bold',
    },
    label: {
        color: colors.color,
        fontSize: Font.Normal[size],
    }
});

const mapStateToProps = (state: StateShape) => ({
    session: state.sessions.items[state.sessions.items.length - 1],
});

export const SessionEndScreen = connect(mapStateToProps)(SessionEnd);
