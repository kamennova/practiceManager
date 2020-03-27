import React from "react";
import { Switch, Text, View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { DaysInput } from "../basic/Inputs/DaysInput";

type NotifProps = {
    interval: number,
    enabled: boolean,
    updateInterval: (_: number) => void,
    updateEnabled: () => void,
}

export const PieceNotifications = (props: NotifProps) => (

    <View style={{ ...AppPaddingStyle, borderTopWidth: 1, borderColor: 'lightgrey', paddingTop: 30 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
            <Text style={{ fontSize: 17 }}>Practice reminders</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={props.enabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={props.updateEnabled}
                value={props.enabled}/>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 17, }}>Practice interval: </Text>
            <DaysInput value={props.interval}
                       onChange={props.updateInterval}
                       minVal={1} maxVal={100}/>
            <Text
                style={{ fontSize: 17 }}>day{props.interval > 1 ? 's' : undefined}
            </Text>
        </View>
    </View>
);
