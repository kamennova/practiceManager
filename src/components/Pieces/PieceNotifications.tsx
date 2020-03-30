import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { DaysInput } from "../basic/Inputs/DaysInput";
import { ItemSection } from "../basic/ItemSection";

type NotifProps = {
    interval: number,
    enabled: boolean,
    updateInterval: (_: number) => void,
    updateEnabled: () => void,
}

export const PieceNotifications = (props: NotifProps) => (
    <ItemSection title='Reminders'>
        <NotifOption label={props.enabled ? 'Enabled' : 'Disabled'}>
            <Switch onValueChange={props.updateEnabled}
                    value={props.enabled}/>
        </NotifOption>

        <NotifOption label='Practice interval'>
            <View style={styles.inputWrap}>
                <DaysInput value={props.interval} onChange={props.updateInterval} minVal={1} maxVal={100}/>
                <Text style={styles.label}>day{props.interval > 1 ? 's' : undefined}</Text>
            </View>
        </NotifOption>

    </ItemSection>
);

const NotifOption = (props: { label: string, children: JSX.Element }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{props.label}</Text>
        {props.children}
    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.08)',
        paddingBottom: 12,
        paddingTop: 12,
        paddingRight: 5,
    },
    label: { fontSize: 17 },
    inputWrap: { flexDirection: 'row' }
});
