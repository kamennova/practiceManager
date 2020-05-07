import React from "react";
import { Switch, Text, View } from "react-native";
import { useTheme } from "../../theme";
import { NumberInput } from "../basic/inputs/NumberInput";
import { DurationInputStyle as getStyles } from "../../AppStyle";
import { ItemSection } from "../basic/ItemSection";
import { SectionRow } from "../basic/SectionRow";

type NotifProps = {
    interval: number,
    enabled: boolean,
    updateInterval: (_: number) => void,
    updateEnabled: () => void,
}

export const PieceNotifications = (props: NotifProps) => {
    const styles = getStyles(useTheme().colors);

    return (
        <ItemSection title='Reminders'>
            <SectionRow label={props.enabled ? 'Enabled' : 'Disabled'}>
                <Switch onValueChange={props.updateEnabled}
                        value={props.enabled} style={{ marginRight: 2 }}/>
            </SectionRow>
            <SectionRow label='Practice interval'>
                <View style={styles.wrap}>
                    <NumberInput
                        value={props.interval}
                        onChange={props.updateInterval}
                        minVal={1} maxVal={100}/>
                    <Text style={styles.textStyle}>day{props.interval > 1 ? 's' : ''}</Text>
                </View>
            </SectionRow>

        </ItemSection>
    );
};
