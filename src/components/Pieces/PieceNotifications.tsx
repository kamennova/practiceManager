import React from "react";
import { Switch } from "react-native";
import { NumberInput } from "../basic/Inputs/NumberInput";

import { ItemSection } from "../basic/ItemSection";
import { SectionRow } from "../basic/SectionRow";

type NotifProps = {
    interval: number,
    enabled: boolean,
    updateInterval: (_: number) => void,
    updateEnabled: () => void,
}

export const PieceNotifications = (props: NotifProps) => (
    <ItemSection title='Reminders'>
        <SectionRow label={props.enabled ? 'Enabled' : 'Disabled'}>
            <Switch onValueChange={props.updateEnabled}
                    value={props.enabled}/>
        </SectionRow>
        <SectionRow label='Practice interval'>
                <NumberInput value={props.interval}
                             onChange={props.updateInterval}
                             minVal={1} maxVal={100}
                             measure='day'/>
        </SectionRow>

    </ItemSection>
);
