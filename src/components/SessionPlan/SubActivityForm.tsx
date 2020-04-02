import React, { useState } from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Dark } from "../../AppStyle";
import { Activity, ActivityType } from "../../types/Activity";
import { NumberInput } from "../basic/Inputs/NumberInput";
import { MyPicker } from "../basic/Inputs/Picker";

type BlockFormProps = {
    onSave: (_: Activity) => void,
    lastActivityType?: ActivityType,
    items: { val: any, label: string }[],
}

const BaseActivity = { type: ActivityType.WarmUp, duration: 3 };

export const SubActivityForm = (props: BlockFormProps) => {
    const [activity, setActivity] = useState(BaseActivity);

    const setType = (type: string) => setActivity({ ...activity, type: type as ActivityType });
    const setDuration = (mins: number) => setActivity({ ...activity, duration: mins });
    const onSave = () => {
        props.onSave(activity);
        setActivity(BaseActivity);
    };

    return (
        <View style={styles.wrap}>
            <View style={styles.formWrap}>
                <MyPicker selected={activity.type}
                          items={props.items}
                          onValueChange={setType}
                          wrapperStyle={{ marginBottom: 0 }}/>
                <NumberInput onChange={setDuration} value={activity.duration} measure='m' measurePlural='m'/>
            </View>

            <AddActivityBtn isOpen={true} onPress={onSave}/>
        </View>
    );
};

const AddActivityBtn = (props: { onPress: () => void, isOpen: boolean }) => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <View style={styles.add}>
            {!props.isOpen ? <Text style={styles.plus}>+</Text> : undefined}
            <Text style={styles.text}>{!props.isOpen ? 'Add activity' : 'Ok'}</Text>
        </View>
    </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
    wrap: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: '#f3f3f3',
    },
    formWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    add: {
        width: '100%',
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    plus: {
        fontSize: 23,
        marginRight: 10,
        color: Dark,
        lineHeight: 27,
    },
    text: {
        fontSize: 16,
        color: Dark,
        fontWeight: 'bold'
    }
});
