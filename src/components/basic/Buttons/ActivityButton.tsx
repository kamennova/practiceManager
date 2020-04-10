import React from "react";
import { Image, ImageStyle, Text, TouchableNativeFeedback, View } from "react-native";
import { ActivityForm as styles } from "../../../AppStyle";
import { ActivityType } from "../../../types/Activity";

export const ActivityBtn = (props: { type: ActivityType, onPress: () => void, isLast?: boolean }) => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <View style={{ ...styles.activityBtn, borderRightWidth: props.isLast ? 1 : 0, }}>
            {getActivityIcon(props.type)}
            <Text style={styles.activityBtnText}>{props.type}</Text>
        </View>
    </TouchableNativeFeedback>
);

const getActivityIcon = (type: ActivityType) => {
    switch (type) {
        case ActivityType.Break:
            return <BreakIcon/>;
        case ActivityType.Technique:
            return <BoltIcon/>;
        case ActivityType.Piece:
            return <MusicIcon/>;
        case ActivityType.SightReading:
            return <EyeIcon/>;
    }
};

const iconStyle = { width: 20, height: 20 };

const BreakIcon = (props: { style?: ImageStyle }) => (
    <Image style={{ ...iconStyle, ...props.style }} source={require('../../../../assets/cup.png')}/>
);

const EyeIcon = (props: { style?: ImageStyle }) => (
    <Image style={{ ...iconStyle, ...props.style }} source={require('../../../../assets/eye.png')}/>
);

const MusicIcon = (props: { style?: ImageStyle }) => (
    <Image style={{ ...iconStyle, ...props.style }} source={require('../../../../assets/music.png')}/>
);

const BoltIcon = (props: { style?: ImageStyle }) => (
    <Image style={{ ...iconStyle, ...props.style }} source={require('../../../../assets/bolt.png')}/>
);
