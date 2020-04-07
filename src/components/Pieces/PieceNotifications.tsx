import React from "react";
import { Switch, Text, View } from "react-native";
import { NotifStyle as styles } from "../../AppStyle";
import { NumberInput } from "../basic/Inputs/NumberInput";

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
                <NumberInput value={props.interval}
                             onChange={props.updateInterval}
                             minVal={1} maxVal={100}
                             measure='day'/>
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