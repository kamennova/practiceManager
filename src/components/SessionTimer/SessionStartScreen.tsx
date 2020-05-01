import React, { useState } from 'react';
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { FullScreenModalStyle, SessionStartStyle as getStyles } from "../../AppStyle";
import { FREE_SESSION_ACTIVITY_CHOICE, PLANNED_SESSION_TIMER } from "../../NavigationPath";
import { StateShape } from "../../store/StoreState";
import { useTheme } from "../../theme";
import { SessionPlan } from "../../types/SessionPlan";
import { MinorButton, PrimaryButton } from "../basic/Buttons/Button";
import { TimerIcon, TimerOffIcon } from "../basic/icons/Timer";
import { MyPicker } from "../basic/Inputs/Picker";
import { ModalTitle } from "../basic/Titles/ModalTitle";
import { SessionTypeOption } from "./SessionTypeOption";

type StartProps = {
    navigation: any,
    plans: SessionPlan[],
};

const IconSize = 19;

const SessionStart = (props: StartProps) => {
    const [usePlan, updateUsePlan] = useState(false);
    const [planName, updatePlanName] = useState('daily');

    const setUsePlan = () => {
        if (props.plans.length > 0) {
            updateUsePlan(true);
        }
    };

    const setPlan = (itemValue: string) => {
        updateUsePlan(true);
        updatePlanName(itemValue);
    };

    const navigateToTimer = () => usePlan ?
        props.navigation.navigate(PLANNED_SESSION_TIMER, { plan: props.plans[0] }) :
        props.navigation.navigate(FREE_SESSION_ACTIVITY_CHOICE);

    const planItems = (props.plans.length > 0 ? props.plans.map(pl => pl.name) : ['-'])
        .map(name => ({ val: name, label: name }));

    const styles = getStyles(useTheme().colors);

    return (
        <View style={FullScreenModalStyle}>
            <ModalTitle> New session </ModalTitle>

            <View style={styles.wrap}>
                <SessionTypeOption isSelected={!usePlan} updateSelected={() => updateUsePlan(false)}>
                    <View style={styles.noPlanOption}>
                        <TimerOffIcon size={IconSize}/>
                        <Text style={styles.noPlanText}>No plan</Text>
                    </View>
                </SessionTypeOption>

                <SessionTypeOption isSelected={usePlan} updateSelected={setUsePlan}>
                    <TimerIcon size={IconSize}/>
                    {props.plans.length === 0 ? <NoPlansText/> :
                        <MyPicker selected={planName}
                                  enabled={usePlan && props.plans.length > 0}
                                  wrapperStyle={styles.pickerWrap}
                                  items={planItems}
                                  onValueChange={setPlan}/>}
                </SessionTypeOption>
            </View>

            <View style={{ marginTop: 'auto', marginBottom: 25 }}>
                <PrimaryButton onPress={navigateToTimer} style={{ marginBottom: 15 }}> Start </PrimaryButton>
                <MinorButton style={{ alignSelf: 'center' }}
                             onPress={props.navigation.goBack}>Cancel</MinorButton>
            </View>
        </View>
    );
};

const NoPlansText = () => (<View style={{ paddingTop: 15, paddingBottom: 15, marginLeft: 5 }}><Text>You don't have any
    plans yet</Text></View>);

const mapStateToProps = (state: StateShape) => ({
    plans: state.plans.items,
});

export const SessionStartScreen = connect(mapStateToProps)(SessionStart);
