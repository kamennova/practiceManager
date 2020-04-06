import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { Primary, SessionStartStyle as styles } from "../../AppStyle";

type TypeOptionProps = {
    isSelected: boolean,
    children: JSX.Element | (JSX.Element | undefined)[],
    updateSelected: () => void,
};

export const SessionTypeOption = (props: TypeOptionProps) => (
    <TouchableWithoutFeedback onPress={props.updateSelected}>
        <View style={{
            ...styles.option,
            borderColor: props.isSelected ? Primary : 'lightgrey',
            borderWidth: props.isSelected ? 2 : 2,
        }}>
            <RadioButton isChecked={props.isSelected}/>
            {props.children}
        </View>
    </TouchableWithoutFeedback>
);

const RadioButton = (props: { isChecked: boolean }) => (
    <View style={styles.circle}>
        {props.isChecked ? <View style={styles.dot}/> : undefined}
    </View>
);
