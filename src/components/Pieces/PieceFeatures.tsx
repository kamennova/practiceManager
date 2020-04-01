import React from "react";
import { Text, View } from "react-native";
import { FeaturesStyle as styles } from "../../AppStyle";
import { PieceStatus } from "../../types/Piece";
import { minutesToHumanlyFormat } from "../../utils/time";

export const Features = (props: { status: PieceStatus, timeSpent: number, lastPracticed?: Date }) => (
    <View style={styles.wrap}>
        <Feature isFirst={true}
                 label='Status'>{props.status !== undefined ? props.status : 'In work'}</Feature>
        <Feature label='Time spent'>{minutesToHumanlyFormat(props.timeSpent)}</Feature>
        <Feature label='Last practiced'>
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
        <Text style={styles.val}>{props.children}</Text>
        <Text style={styles.label}>{props.label}</Text>
    </View>
);
