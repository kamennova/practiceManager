import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { PiecePickerStyles as getStyles } from "../../../AppStyle";
import { StateShape } from "../../../store/StoreState";
import { useTheme } from "../../../theme";
import { PieceBase } from "../../../types/piece";
import { findItemOrThrowError } from "common/utils/find";

const MAX_TIPS = 10;

type PickerItem = { value: number | string, label: string };

type InputProps = {
    pieceId?: number,
    pieces: PieceBase[],
    onChoose: (val: string | number | undefined) => void,
    default?: PickerItem,
}

const getLabel = (p: PieceBase) => p.name + (p.author !== undefined ? ' by ' + p.author : '');

const PiecePickerComponent = (props: InputProps) => {
    const init = props.pieceId !== undefined ? getLabel(findItemOrThrowError(props.pieces, props.pieceId)) : '';

    const [input, setInput] = useState<(string | number) | undefined>(init);
    const [tips, setTips] = useState<PickerItem[]>([]);
    const [showTips, setShowTips] = useState(false);

    const getTips = (text: string) => {
        setInput(text);

        if (text.length === 0) {
            setTips([]);
        } else {
            setTips(props.pieces.filter(p => p.name.includes(text)).slice(0, MAX_TIPS)
                .map(p => ({ value: p.id, label: getLabel(p) })));
            setShowTips(true);
        }
    };

    const chooseVal = (value: string | number) => {
        setInput(tips.find(item => item.value === value)?.label);
        props.onChoose(value);
        hideTips();
    };

    const hideTips = () => setShowTips(false);
    const styles = getStyles(useTheme().colors);

    return (
        <View style={styles.wrap}>
            <TextInput style={styles.input}
                       placeholder='Search pieces'
                       value={input !== undefined ? input.toString() : ''}
                       onChangeText={getTips} onBlur={hideTips} onSubmitEditing={hideTips}/>
            {showTips ? <TipDropdown onChoose={chooseVal} items={tips}/> : undefined}
        </View>
    );
};

const TipDropdown = (props: { items: PickerItem[], onChoose: (val: string | number) => void }) => {
    const styles = getStyles(useTheme().colors);

    return (
        <View style={styles.dropdown}>
            {props.items.length === 0 ? <Text style={styles.text}>Nothing found :/</Text> : undefined}
            {props.items.map(item => <Tip label={item.label} onChoose={() => props.onChoose(item.value)}/>)}
        </View>
    );
};

const Tip = (props: { label: string, onChoose: () => void }) => {
    const styles = getStyles(useTheme().colors);

    return (
        <TouchableOpacity onPress={props.onChoose}>
            <View style={styles.tip}>
                <Text style={styles.text}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    );
};

const mapStateToProps = (state: StateShape) => ({
    pieces: state.pieces.items,
});

export const PiecePicker = connect(mapStateToProps)(PiecePickerComponent);
