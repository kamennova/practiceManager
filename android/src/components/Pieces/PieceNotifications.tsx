import React from "react";
import { Switch, Text, View } from "react-native";
import { DurationInputStyle as getStyles } from "../../AppStyle";
import { useTheme } from "../../theme";
import { useDeviceSize } from "../basic/adaptive/query";
import { DaysInput } from "../basic/inputs/DaysInput";
import { ItemSection } from "../basic/ItemSection";

type NotifProps = {
    interval: number,
    enabled: boolean,
    updateInterval: (_: number) => void,
    updateEnabled: () => void,
}

export const PieceNotifications = (props: NotifProps) => {
    const styles = getStyles(useTheme().colors, useDeviceSize());

    return (
        <ItemSection title='Reminders' activeElem={<Switch onValueChange={props.updateEnabled}
                                                           value={props.enabled} style={{ marginRight: 2 }}/>}>
            <View style={styles.wrap}>
                <Text style={styles.label}>Practice every</Text>
                <DaysInput updateInterval={props.updateInterval} interval={props.interval}/>
            </View>
        </ItemSection>
    );
};
