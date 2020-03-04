import React, { useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { FullScreenModalStyle, PlanOptionStyle, PrimaryButtonStyle } from "../../AppStyle";
import { plans } from "../../exampleData";
import { DASHBOARD, FREE_SESSION_ACTIVITY_CHOICE, PLANNED_SESSION_TIMER } from "../../NavigationPath";
import { Button } from "../basic/Buttons/Button";
import { MyPicker } from "../basic/Inputs/Picker";
import { ModalTitle } from "../basic/Titles/ModalTitle";
import { TimerIcon, TimerOffIcon } from "../icons";

export const SessionStartScreen = (props: { navigation: any }) => {
    const [usePlan, updateUsePlan] = useState(false);
    const [planName, updatePlanName] = useState('daily');

    const navigateToTimer = () => usePlan ?
        props.navigation.navigate(PLANNED_SESSION_TIMER, { plan: plans[0] }) :
        props.navigation.navigate(FREE_SESSION_ACTIVITY_CHOICE, { history: [] });

    return (
        <View style={{
            ...FullScreenModalStyle,
        }}>
            <ModalTitle> New session </ModalTitle>

            <View style={{ marginBottom: 30, marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                <SessionTypeOption isSelected={!usePlan} updateSelected={() => updateUsePlan(false)}>
                    <TimerOffIcon style={IconStyle}/>
                    <Text style={{ fontSize: 18 }}>
                        No plan
                    </Text>
                </SessionTypeOption>

                <SessionTypeOption isSelected={usePlan} updateSelected={() => updateUsePlan(true)}>
                    <TimerIcon style={IconStyle}/>
                    <MyPicker selected={planName} wrapperStyle={{ borderWidth: 0, marginBottom: 0 }}
                              items={[{ val: 'daily', label: 'Daily session' }, {
                                  val: 'preconcert',
                                  label: 'Pre-concert'
                              }]}
                              onValueChange={(itemValue: string) => {
                                  updateUsePlan(true);
                                  updatePlanName(itemValue);
                              }}/>
                </SessionTypeOption>
            </View>

            <Button onPress={navigateToTimer} style={{ ...PrimaryButtonStyle, marginBottom: 15 }}> Start </Button>
            <Button onPress={() => props.navigation.navigate(DASHBOARD)}>Cancel</Button>
        </View>
    );
};

const IconStyle = {
    marginRight: 15,
    width: 30,
    height: 30,
};

type TypeOptionProps = {
    isSelected: boolean,
    children: JSX.Element | JSX.Element[],
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
