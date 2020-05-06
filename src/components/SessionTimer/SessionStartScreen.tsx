import { StackActions } from '@react-navigation/native';
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
    const defaultPlanId = props.plans.length > 0 ? props.plans[0].id : 0;

    const [usePlan, setUsePlan] = useState(false);
    const [planId, setPlanId] = useState<number>(defaultPlanId);

    const doUsePlan = () => {
        if (props.plans.length > 0) {
            setUsePlan(true);
        }
    };

    const setPlan = (itemId: string) => {
        setUsePlan(true);
        setPlanId(Number(itemId));
    };

    const replace = (path: string, opt?: any) => props.navigation.dispatch(StackActions.replace(path, opt));

    const navigateToTimer = () => usePlan ?
        replace(PLANNED_SESSION_TIMER, { planId: Number(planId) }) :
        replace(FREE_SESSION_ACTIVITY_CHOICE, { isFirstActivity: true });

    const planItems = props.plans.length > 0 ? props.plans.map(item => ({ val: item.id, label: item.name }))
        : [{ val: '-', label: '-' }];

    const styles = getStyles(useTheme().colors);

    return (
        <View style={FullScreenModalStyle}>
            <ModalTitle> New session </ModalTitle>

            <View style={styles.wrap}>
                <SessionTypeOption isSelected={!usePlan} updateSelected={() => setUsePlan(false)}>
                    <View style={styles.noPlanOption}>
                        <TimerOffIcon size={IconSize}/>
                        <Text style={styles.noPlanText}>No plan</Text>
                    </View>
                </SessionTypeOption>

                <SessionTypeOption isSelected={usePlan} updateSelected={doUsePlan}>
                    <TimerIcon size={IconSize}/>
                    {props.plans.length === 0 ? <NoPlansText/> :
                        <MyPicker selected={planId}
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
