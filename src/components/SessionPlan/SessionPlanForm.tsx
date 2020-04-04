import React, { Component } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { ActivityBlockHeight, AppPaddingStyle, AppSidePadding } from "../../AppStyle";
import { validatePlan } from "../../db/validation";
import { Activity } from "../../types/Activity";
import { EmptyPlan } from "../../types/EmptyPlan";
import { FormProps, FormState } from "../../types/ItemForm";
import { SessionPlan } from "../../types/SessionPlan";
import { ErrorAlert } from "../basic/Alerts";
import { SaveButton } from "../basic/Buttons/ActionButton";
import { MyTextInput } from "../basic/Inputs/TextInput";
import { ItemMenu } from "../basic/ItemMenu";
import { ItemSection } from "../basic/ItemSection";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { ActivityBlock } from "./ActivityBlock";
import { ActivityForm } from "./ActivityForm";

export class SessionPlanForm extends Component<FormProps<SessionPlan, { plan: SessionPlan }>,
    FormState<{ plan: SessionPlan }> & { showMenu: number }> {
    state = {
        plan: EmptyPlan,
        showMenu: -1,
        errors: '',
    };

    setPlan(plan: SessionPlan) {
        this.setState({ errors: this.state.errors, plan });
    }

    deleteActivity = () => this.setPlan({
        ...this.state.plan,
        schedule: this.state.plan.schedule.splice(this.state.showMenu),
    });

    setShowMenu = (index: number) => this.setState({ ...this.state, showMenu: index });

    menu = [
        { label: 'Delete', func: this.deleteActivity, },
    ];

    addActivity = (act: Activity) => {
        this.setPlan({ ...this.state.plan, schedule: [...this.state.plan.schedule, act] });
    };

    async validateAndSave() {
        const res = await validatePlan(this.state.plan.name);

        if (res.valid) {
            this.setState({ plan: this.state.plan, errors: '' });
            console.log('valid');
        } else {
            this.setState({ plan: this.state.plan, errors: res.errors });
        }
    }

    render() {
        return (
            <ScreenWrapper>
                <ScrollView contentContainerStyle={styles.scroll}>
                    <View style={AppPaddingStyle}>
                        <MyTextInput onChangeText={(val) => this.setPlan({ ...this.state.plan, name: val })}
                                     value={this.state.plan.name}
                                     autoFocus={false}
                                     isRequired={true}
                                     placeholder='Name'/>
                        {this.state.errors !== '' ? <ErrorAlert message={this.state.errors}/> : undefined}
                    </View>

                    <ItemSection title='Schedule'>
                        <View style={{ marginTop: 5 }}>

                            <View style={styles.blocksWrap}>
                                {this.state.plan.schedule.length === 0 ?
                                    <Text>No activities here yet</Text> : undefined}

                                {this.state.plan.schedule.map((act, i) => (
                                    <ActivityBlock onShowMenu={() => this.setShowMenu(i)} {...act} />))}
                            </View>

                            <ActivityForm onSave={this.addActivity}/>
                        </View>
                    </ItemSection>

                    {this.state.showMenu > -1 ?
                        [
                            <Layer onPress={() => this.setState({ ...this.state, showMenu: -1 })}/>,
                            <ItemMenu style={getMenuStyle(this.state.showMenu)}
                                      prevFunc={() => this.setState({ ...this.state, showMenu: -1 })}
                                      options={this.menu}/>
                        ] : undefined}
                </ScrollView>
                <SaveButton style={styles.save} onPress={async () => await this.validateAndSave()}/>
            </ScreenWrapper>
        );
    };
}

const getMenuStyle = (index: number): ViewStyle => ({
    top: 150 + ActivityBlockHeight * index,
    right: AppSidePadding + 8,
});

const Layer = (props: { onPress: () => void }) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={{
            position: 'absolute',
            height: Dimensions.get("window").height,
            width: '100%',
            top: -40,
            left: 0,
        }}/>
    </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
    scroll: {
        paddingBottom: 180,
        paddingTop: 30,
        minHeight: '100%',
    },
    save: {
        top: Dimensions.get('window').height - 140,
    },
    blocksWrap: {
        borderRadius: 1,
        borderWidth: 2,
        borderStyle: "dashed",
        padding: 7,
        borderColor: 'lightgrey',
        marginBottom: 15,
    },
});

