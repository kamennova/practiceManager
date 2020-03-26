import React from "react";
import { Text, View } from "react-native";
import { PieceStatus } from "../../types/Piece";
import { minutesToHumanlyFormat } from "../../utils/time";

export const Features = (props: { status: PieceStatus, timeSpent: number, lastPracticed?: Date }) => (
    <View style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 14,
        borderColor: 'lightgrey',
    }}>
        <Feature isFirst={true}
            label='Status'>{props.status !== undefined ? props.status : 'In work'}</Feature>
        <Feature label='Time spent'>{minutesToHumanlyFormat(props.timeSpent)}</Feature>
        <Feature label='Last practiced' >
            {props.lastPracticed !== undefined ? props.lastPracticed.toDateString() : 'Never'}</Feature>
    </View>
);

type FeatureProps = {
    label: string,
    children: string | string[],
    isFirst?: boolean,
}

export const Feature = (props: FeatureProps) => (
    <View style={{
        borderLeftWidth: props.isFirst ? 0 : 1,
        borderColor: 'lightgrey',
        paddingLeft: props.isFirst ? 0 : 15,
        width: props.isFirst ? '30%' : '35%',
    }}>
        <Text style={{ fontSize: 17, marginBottom: 4 }}>{props.children}</Text>
        <Text style={{ fontSize: 14, color: 'darkgrey', }}>{props.label}</Text>
    </View>
);
