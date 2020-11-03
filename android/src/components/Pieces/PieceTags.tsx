import React from "react";
import { FlatList, Text, View } from "react-native";
import { TagStyle, TagTextStyle } from "../../AppStyle";

export const PieceTags = (props: { tags: string[] }) => (
    <FlatList contentContainerStyle={{ flexDirection: 'row' }}
              data={props.tags}
              keyExtractor={(item) => item}
              renderItem={({ item }) => <Tag tag={item}/>}/>
);

const Tag = (props: { tag: string }) => (
    <View style={TagStyle}>
        <Text style={TagTextStyle}>
            #{props.tag}
        </Text>
    </View>
);
