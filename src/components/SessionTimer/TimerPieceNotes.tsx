import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Direction } from "../../types/Direction";
import { Note } from '../../types/Note';
import { ChevronIcon } from "../basic/icons/Chevron";
import { NoteItem } from "../basic/Note";
import { AddNoteBtn } from "../basic/Note/AddNoteBtn";

type NotesProps = {
    notes: Note[],
    onAdd: () => void,
};

export const TimerPieceNotes = (props: NotesProps) => {
    return (
        <View style={{
            marginBottom: 20,
            marginTop: 20,
            width: '100%',
            flexGrow: 1,
            alignItems: 'center',
        }}>
            {props.notes.length > 0 ? <NotesSlider notes={props.notes}/> : undefined}
            <AddNoteBtn onPress={props.onAdd} showFullLabel={true}/>
        </View>
    );
};

const NotesSlider = (props: { notes: Note[] }) => {
    const [index, setIndex] = useState(0);

    const current = props.notes[index];

    const onNext = props.notes.length > 1 ? () => setIndex((index + 1) % props.notes.length) : undefined;
    const onPrev = props.notes.length > 1 ? () => setIndex((index === 0 ? props.notes.length - 1 : index - 1)) : undefined;

    return (
        <View style={styles.sliderWrap}>
            <RotateBtn direction={Direction.Left} onClick={onPrev}/>
            <NoteItem addedOn={current.addedOn} content={current.content}
                      noteStyle={styles.noteStyle}/>
            <RotateBtn direction={Direction.Right} onClick={onNext}/>
        </View>
    );
};

const RotateBtn = (props: { direction: Direction, onClick?: () => void }) => (
    <TouchableOpacity onPress={props.onClick}>
        <View style={styles.rotateBtn}>
            <ChevronIcon direction={props.direction}/>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    sliderWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        marginBottom: 12,
    },
    noteWrap: {
        flexGrow: 1,
        marginBottom: 0,
    },
    rotateBtn: {
        padding: 8,
    },
    noteStyle: {
        justifyContent: 'center',
        flexGrow: 1,
    },
});
