import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { Dark, SessionOptionStyle as getStyles } from "../../AppStyle";
import { useTheme } from "../../theme";

type TypeOptionProps = {
    isSelected: boolean,
    children: JSX.Element | (JSX.Element | undefined)[],
    updateSelected: () => void,
};

export const SessionTypeOption = (props: TypeOptionProps) => {
    const colors = useTheme().colors;
    const styles = getStyles(colors);

    return (
        <TouchableWithoutFeedback onPress={props.updateSelected}>
            <View style={{
                ...styles.option,
                borderColor: props.isSelected ? Dark : colors.borderFaded,
                borderWidth: props.isSelected ? 2 : 2,
            }}>
                <RadioButton isChecked={props.isSelected}/>
                {props.children}
            </View>
        </TouchableWithoutFeedback>
    );
};

const RadioButton = (props: { isChecked: boolean }) => {
    const styles = getStyles(useTheme().colors);

    return (
        <View style={styles.circle}>
            {props.isChecked ? <View style={styles.dot}/> : undefined}
        </View>
    );
};
