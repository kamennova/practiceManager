import React from "react";
import { Text, View } from "react-native";
import { FeaturesStyle as getStyles } from "../../AppStyle";
import { useTheme } from "../../theme";

type FeaturesProps = {
  items: Array<{label: string, val: number|string}>
};

export const ItemFeatures = (props: FeaturesProps) => {
    const styles = getStyles(useTheme().colors);

    return (
        <View style={styles.wrap}>
            {props.items.map((item, i) => <Feature isFirst={i === 0} label={item.label} val={item.val} />)}
        </View>
    )};

type FeatureProps = {
    label: string,
    val: string | string[] | number,
    isFirst?: boolean,
}

export const Feature = (props: FeatureProps) => {
    const colors = useTheme().colors;
    const styles = getStyles(colors);

    return (
        <View style={{
            borderLeftWidth: props.isFirst ? 0 : 1,
            borderColor: colors.border,
            paddingLeft: props.isFirst ? 0 : 15,
            width: props.isFirst ? '30%' : '35%',
        }}>
            <Text style={styles.val}>{props.val}</Text>
            <Text style={styles.label}>{props.label}</Text>
        </View>
    )
};
