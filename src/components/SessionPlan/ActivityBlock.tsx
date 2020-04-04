import React from "react";
import { Image, Text, TouchableNativeFeedback, View } from "react-native";
import { ActivityBlockStyle as styles } from "../../AppStyle";
import { Activity } from "../../types/Activity";

type BlockProps = Activity & {
    onShowMenu: () => void,
    setDuration?: (val: number) => void, // todo ?
}

export const ActivityBlock = (props: BlockProps) => (
    <View style={styles.wrap}>
        <Text style={styles.name}>{props.type}</Text>
        <Text style={styles.duration}>{props.duration} min</Text>
        <DotsIcon onPress={props.onShowMenu}/>
    </View>
);

const DotsIcon = (props: { onPress: () => void }) => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <Image style={styles.dots} source={require('../../../assets/dots.png')}/>
    </TouchableNativeFeedback>
);
