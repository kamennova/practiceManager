import React from "react";
import { Text, View } from "react-native";
import { TagStyle, TagTextStyle } from "../../AppStyle";

export const PieceTags = (props: { tags: string[] }) => (
    <View style={{ flexDirection: 'row' }}>
        {props.tags.map(tag => <Tag tag={tag}/>)}
    </View>
);

const Tag = (props: { tag: string }) => (
    <View style={TagStyle}>
        <Text style={TagTextStyle}>
            #{props.tag}
        </Text>
    </View>
);
