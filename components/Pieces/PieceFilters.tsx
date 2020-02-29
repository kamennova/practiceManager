import React from 'react';
import { Text, View } from "react-native";

export const PieceFilters = () => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
        }}>
            <FilterLabel isActive={false} name='Archived' onPress={() => {}} />
            <FilterLabel isActive={true} name='Concert' onPress={() => {}} />
        </View>
    );
};

type FilterLabelProps = {
    name: string,
    isActive: boolean,
    onPress: () => void,
};

export const FilterLabel = (props: FilterLabelProps) => {
    return (
        <View style={{
            paddingTop: 2,
            paddingBottom: 2,
            paddingRight: 6,
            paddingLeft: 6,
            marginRight: 6,
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: props.isActive ? 'black' : 'white',
        }}>
            <Text style={{
                color: props.isActive ? 'white' : 'black',
            }}>
                {props.name}
            </Text>
        </View>
    );
};
