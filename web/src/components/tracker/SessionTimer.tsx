import { endSession } from 'common/store/actions';
import { StateShape } from "common/store/StoreState";
import { Activity, ActivityType } from "common/types/activity";
import { Piece, PieceBase } from "common/types/piece";
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { BreakButton, FinishButton, NextButton } from "../buttons/Timer";
import { NoteModal } from "../modals/NoteModal";
import { TimerNotes } from "./TimerNotes";

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
    const [piece, setPiece] = useState<Piece | undefined>(undefined);
    const [showNoteForm, setShowNoteForm] = useState(false);


    useEffect(() => {
        if ((props.activity.type === ActivityType.SightReading || props.activity.type === ActivityType.Piece)
            && props.activity.pieceId !== undefined) {

        } else {
            setPiece(undefined);
        }
    }, [props.activity]);

    const endSession = async () => {
        await props.onEndSession();
    };

    const addNote = async (_content: string) => {

    };

    const showNotes = (props.activity.type === ActivityType.SightReading || props.activity.type === ActivityType.Piece)
        && props.activity.pieceId !== undefined && piece !== undefined;

    return (
        <div className={'session-timer main-content'}>
            <h2 className={'timer-title'}>{props.activity.type}</h2>
            {props.children}

            {showNotes ? <TimerNotes onAdd={() => setShowNoteForm(true)} notes={piece?.notes}/> : undefined}

            <div className={'timer-buttons'}>
                <FinishButton onClick={endSession}/>
                <BreakButton onClick={props.onBreak}/>
                <NextButton onClick={props.onNextActivity} label={props.isFree ? 'Next' : 'Skip'}/>
            </div>

            {showNoteForm && <NoteModal onSaveNote={addNote} closeModal={() => setShowNoteForm(false)}/>}
        </div>
    );
};

const mapStateToProps = (state: StateShape) => ({
    pieces: state.pieces.items,
});

const mapDispatchToProps = (dispatch: any) => ({
    onEndSession: () => dispatch(endSession()),
});

export const SessionTimer = connect(mapStateToProps, mapDispatchToProps)(SessionTimerComponent);
