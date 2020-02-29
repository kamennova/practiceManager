import React, { useState } from 'react';
import { Picker, Text, TouchableWithoutFeedback, View } from "react-native";
import { ModalStyle, ModalTitleStyle, PickerStyle, PlanOptionStyle } from "../../../AppStyle";
import { plans } from "../../../exampleData";
import { Button } from "../Buttons/Button";

export const SessionStartModal = (props: { navigation: any }) => {
    const [usePlan, updateUsePlan] = useState(false);
    const [planName, updatePlanName] = useState('daily');

    const navigateToTimer = () => usePlan ?
        props.navigation.navigate('PlannedSessionScreen', { plan: plans[0] }) :
        props.navigation.navigate('FreeSessionActivityChoice', { history: [] });

    return (
        <View style={ModalStyle}>
            <Text style={ModalTitleStyle}>
                Start session
            </Text>

            <View style={{ marginBottom: 20, borderWidth: 1 }}>
                <SessionTypeOption isSelected={!usePlan} updateSelected={() => updateUsePlan(false)}>
                    <Text>
                        No plan
                    </Text>
                </SessionTypeOption>

                <SessionTypeOption isSelected={usePlan} updateSelected={() => updateUsePlan(true)}>
                    <Picker
                        selectedValue={planName}
                        style={PickerStyle}
                        onValueChange={(itemValue: string) => {
                            updateUsePlan(true);
                            updatePlanName(itemValue);
                        }}>
                        <Picker.Item label="Daily session" value="daiy"/>
                        <Picker.Item label="Pre-concert" value="preconcert"/>
                    </Picker>
                </SessionTypeOption>
            </View>

            <Button onPress={navigateToTimer}>
                <Text>Start</Text>
            </Button>
        </View>
    );
};

type TypeOptionProps = {
    isSelected: boolean,
    children: JSX.Element,
    updateSelected: () => void,
};

const SessionTypeOption = (props: TypeOptionProps) => (
    <TouchableWithoutFeedback onPress={props.updateSelected}>
        <View style={{
            ...PlanOptionStyle(props.isSelected)
        }}>
            {props.children}
        </View>
    </TouchableWithoutFeedback>
);



