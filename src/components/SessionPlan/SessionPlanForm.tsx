import React, { Component } from 'react';
import { ScrollView, Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";
import { ActivityBlockHeight, AppPaddingStyle, AppSidePadding, PlanFormStyle as getStyles } from "../../AppStyle";
import { validatePlan } from "../../db/validation";
import { StateShape } from "../../store/StoreState";
import { thunkAddPlan } from "../../store/thunks/plan";
import { DEFAULT_THEME, ThemeColors } from "../../theme";
import { EmptyPlan } from "../../types/EmptyPlan";
import { FormProps, FormState } from "../../types/item/ItemForm";
import { PlanActivity } from "../../types/PlanActivity";
import { SessionPlan } from "../../types/SessionPlan";
import { swipe } from "../../utils/array";
import { ErrorAlert } from "../basic/Alerts";
import { SaveButton } from "../basic/Buttons/ActionButton";
import { AddActivityBtn } from "../basic/Buttons/AddActivityBtn";
import { MyTextInput } from "../basic/Inputs/TextInput";
import { ItemMenu } from "../basic/ItemMenu";
import { ItemSection } from "../basic/ItemSection";
import { Layer } from "../basic/Layer";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { ActivityBlock } from "./ActivityBlock";
import { ActivityFormModal } from "./ActivityFormModal";

type Coord = { x: number, y: number };

class SessionPlanFormClass extends Component<FormProps<SessionPlan, { plan: SessionPlan }>,
    FormState<{ plan: SessionPlan }> & { showMenu: number, showModal: boolean, editing: number, dragging: number }> {

    val: Coord = { x: 0, y: 0 };

    constructor(props: FormProps<SessionPlan, { plan: SessionPlan }>) {
        super(props);

        this.state = {
            plan: EmptyPlan,
            showMenu: -1,
            showModal: false,
            editing: -1,
            dragging: -1,
            errors: '',
        };
    }

    setPlan = async (plan: SessionPlan) => await this.setState({ ...this.state, plan: plan });
    showModal = () => this.setState({ ...this.state, showModal: true });
    hideModal = () => this.setState({ ...this.state, showModal: false });

    addActivity = (act: PlanActivity) => this.setState({
        ...this.state,
        plan: { ...this.state.plan, schedule: [...this.state.plan.schedule, act] },
        showModal: false,
    });

    replaceActivity = async (act: PlanActivity) => {
        const schedule = [...this.state.plan.schedule];
        schedule[this.state.editing] = act;
        await this.setPlan({ ...this.state.plan, schedule });
    };

    editActivity = async () => {
        await this.setState({
            ...this.state,
            editing: this.state.showMenu,
        });

        await this.setState({ ...this.state, showMenu: -1 });
        this.showModal();
    };

    deleteActivity = async () => {
        await this.setPlan({
            ...this.state.plan,
            schedule: this.state.plan.schedule.filter((_, i) => i !== this.state.showMenu),
        });

        this.setState({ ...this.state, showMenu: -1 })
    };

    onSaveActivity = async (act: PlanActivity) => {
        if (this.state.editing > -1) {
            await this.replaceActivity(act);
        } else {
            await this.addActivity(act);
        }

        this.setState({ ...this.state, showModal: false });
    };

    onMoveActivity = async (index: number, pos: -1 | 1) => {
        const schedule = swipe(this.state.plan.schedule, index, index + pos);

        await this.setPlan({ ...this.state.plan, schedule })
    };

    setShowMenu = (index: number) => this.setState({ ...this.state, showMenu: index });

    menu = [
        { label: 'Edit', func: this.editActivity, },
        { label: 'Delete', func: this.deleteActivity, },
    ];

    async validateAndSave() {
        const res = await validatePlan(this.state.plan);

        if (res.valid) {
            this.setState({ plan: this.state.plan, errors: '' });
            await this.props.onHandleSave(this.state.plan);
        } else {
            this.setState({ plan: this.state.plan, errors: res.errors });
        }
    }

    styles = getStyles(ThemeColors[DEFAULT_THEME]);

    render() {
        return (
            <ScreenWrapper>
                <ScrollView contentContainerStyle={this.styles.scroll}>
                    <View style={AppPaddingStyle}>
                        <MyTextInput onChangeText={(val) => this.setPlan({ ...this.state.plan, name: val })}
                                     value={this.state.plan.name}
                                     autoFocus={false}
                                     isRequired={true}
                                     placeholder='Plan name'/>
                        {this.state.errors !== '' && this.state.errors !== undefined ?
                            <ErrorAlert message={this.state.errors}/> : undefined}
                    </View>

                    <ItemSection title='Schedule'>
                        <View style={this.styles.blocksWrap}>
                            {this.state.plan.schedule.length === 0 ?
                                <Text style={this.styles.emptyText}>...</Text> : undefined}

                            {this.state.plan.schedule.map((act, i) => (
                                <ActivityBlock
                                    isFirst={i === 0}
                                    isLast={i === this.state.plan.schedule.length - 1}
                                    onMove={(pos: -1 | 1) => this.onMoveActivity(i, pos)}
                                    onShowMenu={() => this.setShowMenu(i)} activity={act}/>))}

                            <AddActivityBtn onPress={this.showModal}/>
                        </View>
                    </ItemSection>

                    {this.state.showMenu > -1 ?
                        [
                            <Layer onPress={() => this.setState({ ...this.state, showMenu: -1 })}/>,
                            <ItemMenu style={getMenuStyle(this.state.showMenu)} options={this.menu}/>
                        ] : undefined}

                    <ActivityFormModal
                        isVisible={this.state.showModal}
                        hideModal={this.hideModal}
                        onSave={this.onSaveActivity}
                        activity={this.state.editing > -1 ? this.state.plan.schedule[this.state.editing] : undefined}/>
                </ScrollView>
                <SaveButton style={this.styles.save} onPress={async () => await this.validateAndSave()}/>
            </ScreenWrapper>
        );
    };
}

const getMenuStyle = (index: number): ViewStyle => ({
    top: 150 + ActivityBlockHeight * index,
    right: AppSidePadding + 8,
});

const mapStateToProps = (state: StateShape) => ({
    addedItemId: state.plans.lastAddedId,
});

const mapDispatchToProps = (dispatch: any) => ({
   onHandleSave: (plan: SessionPlan) => dispatch(thunkAddPlan(plan)),
});

export const SessionPlanForm = connect(mapStateToProps, mapDispatchToProps)(SessionPlanFormClass);
