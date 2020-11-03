import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import { connect } from "react-redux";
import { addNoteToDb, getPieceById } from "../../db/piece";
import { SESSION_END } from "../../NavigationPath";
import { StateShape } from "../../store/StoreState";
import { thunkEndSession } from "../../store/thunks/session";
import { Activity, ActivityType } from "../../types/activity";
import { Piece, PieceBase } from "../../types/piece";
import { BreakButton, FinishButton, NextButton, TimerButtonsWrapper } from "../basic/buttons/TimerButton";
import { PieceNoteModal } from "../basic/PieceNoteModal";
import { SessionTimerWrap } from "./SessionTimerWrap";
import { TimerPieceNotes } from "./TimerPieceNotes";

type SessionTimerProps = {
    isFree: boolean,
    activity: Activity,
    onNextActivity: () => void,
    onBreak: () => void,
    onEndSession: () => void,
    children?: JSX.Element,
    pieces: PieceBase[],
};

const SessionTimerComponent = (props: SessionTimerProps) => {
    const [piece, setPiece] = useState<Piece|undefined>(undefined);
    const [showNoteForm, setShowNoteForm] = useState(false);
    const nav = useNavigation();

    useEffect(() => {
        if ((props.activity.type === ActivityType.SightReading || props.activity.type === ActivityType.Piece)
            && props.activity.pieceId !== undefined) {
            getPieceById(props.activity.pieceId).then(setPiece);
        } else {
            setPiece(undefined);
        }
    }, [props.activity]);

    const endSession = async () => {
        await props.onEndSession();
        nav.dispatch(StackActions.replace(SESSION_END));
    };

    const addNote = async (content: string) =>
        await addNoteToDb(content, piece?.id)
            .then((id) => {
                setPiece({
                    ...piece, notes: [...piece.notes, { content, id, addedOn: new Date() }]
                });
                setShowNoteForm(false);
            });

    const showNotes = (props.activity.type === ActivityType.SightReading || props.activity.type === ActivityType.Piece)
        && props.activity.pieceId !== undefined && piece !== undefined;

    return (
        <SessionTimerWrap activity={props.activity}>
            {props.children}

            {showNotes ? <TimerPieceNotes onAdd={() => setShowNoteForm(true)} notes={piece?.notes}/> : undefined}

            <View style={{ width: '100%', marginTop: 'auto', alignItems: 'center' }}>
                <TimerButtonsWrapper>
                    <FinishButton onPress={endSession}/>
                    <BreakButton onPress={props.onBreak}/>
                    <NextButton onPress={props.onNextActivity} label={props.isFree ? 'Next' : 'Skip'}/>
                </TimerButtonsWrapper>
            </View>

            <PieceNoteModal onSaveNote={addNote} isVisible={showNoteForm} onHideModal={() => setShowNoteForm(false)}/>
        </SessionTimerWrap>
    );
};

const mapStateToProps = (state: StateShape) => ({
    pieces: state.pieces.items,
});

const mapDispatchToProps = (dispatch: any) => ({
    onEndSession: () => dispatch(thunkEndSession()),
});

export const SessionTimer = connect(mapStateToProps, mapDispatchToProps)(SessionTimerComponent);
