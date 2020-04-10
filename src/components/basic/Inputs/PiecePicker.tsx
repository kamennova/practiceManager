import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { TextInputStyle } from "../../../AppStyle";
import { StateShape } from "../../../store/StoreState";
import { PieceBase } from "../../../types/Piece";

const MAX_TIPS = 10;

type PickerItem = { value: number | string, label: string };

type InputProps = {
    pieces: PieceBase[],
    onChoose: (val: string | number | undefined) => void,
    default?: PickerItem,
}

const PiecePickerComponent = (props: InputProps) => {
    const [input, setInput] = useState<(string | number) | undefined>(undefined);
    const [tips, setTips] = useState<PickerItem[]>([]);
    const [showTips, setShowTips] = useState(false);

    const getTips = (text: string) => {
        setInput(text);

        if (text.length === 0) {
            setTips([]);
        } else {

            setTips(props.pieces.filter(p => p.name.includes(text)).slice(0, MAX_TIPS)
                .map(p => ({ value: p.id, label: p.name + ' by ' + p.authors })));
            setShowTips(true);
        }
    };

    const chooseVal = (value: string | number) => {
        setInput(tips.find(item => item.value === value)?.label);
        props.onChoose(value);
    };

    const hideTips = () => setShowTips(false);

    return (
        <View style={styles.wrap}>
            <TextInput style={{ ...TextInputStyle, ...styles.input }}
                       value={input?.toString()}
                       onChangeText={getTips} onBlur={hideTips} onSubmitEditing={hideTips}/>
            {showTips ? <TipDropdown onChoose={chooseVal} items={tips}/> : undefined}
        </View>
    );
};

const TipDropdown = (props: { items: PickerItem[], onChoose: (val: string | number) => void }) => (
    <View style={styles.dropdown}>
        {props.items.length === 0 ? <Text>Nothing found :/</Text> : undefined}
        {props.items.map(item => <Tip label={item.label} onChoose={() => props.onChoose(item.value)}/>)}
    </View>
);

const Tip = (props: { label: string, onChoose: () => void }) => (
    <TouchableOpacity onPress={() => props.onChoose()}>
        <View style={styles.tip}>
            <Text style={styles.text}>{props.label}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    wrap: {
        width: '100%',
    },
    dropdown: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: 'white',
        padding: 4,
        paddingLeft: 12,
        paddingRight: 12,
    },
    tip: {
        width: '100%',
        paddingTop: 8,
        paddingBottom: 8,
    },
    text: {
        fontSize: 16,
    },
    input: {
        width: '100%',
        flexGrow: 1,
        flexShrink: 0,
        marginBottom: 0,
    }
});

const mapStateToProps = (state: StateShape) => ({
    pieces: state.pieces.items,
});

export const PiecePicker = connect(mapStateToProps)(PiecePickerComponent);
