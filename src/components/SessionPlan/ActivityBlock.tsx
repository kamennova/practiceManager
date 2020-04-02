import React from "react";
import { Image, Text, TouchableNativeFeedback, View } from "react-native";
import { ActivityBlockStyle as styles } from "../../AppStyle";
import { ActivityType, ComplexActivity, SimpleActivity } from "../../types/Activity";
import { SubActivityForm } from "./SubActivityForm";

type BlockProps = (SimpleActivity | ComplexActivity) & {
    showMenu: () => void,
    setDuration?: (val: number) => void, // todo ?
    showSubForm: boolean,
}

export const ActivityBlock = (props: BlockProps) => {
    return (
        <View>
            <View style={styles.wrap}>
                <Text style={styles.name}>{props.type}</Text>
                <Text style={styles.duration}>{props.duration} min</Text>
                <DotsIcon onPress={props.showMenu}/>
            </View>
            {(props.type === ActivityType.Technique ||
            props.type === ActivityType.Pieces ||
            props.type === ActivityType.SightReading) && props.showSubForm ?
                <SubActivityForm onSave={() => {}} items={[]} />

                : undefined }
        </View>
    );
};

const DotsIcon = (props: { onPress: () => void }) => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <Image style={styles.dots} source={require('../../../assets/dots.png')}/>
    </TouchableNativeFeedback>
);
