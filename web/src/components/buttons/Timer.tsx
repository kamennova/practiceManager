import React from 'react';

const IconSize = 24;

type ButtonProps = {
    onClick?: () => void,
}

const TimerButton = (props: ButtonProps & { label: string, icon?: string }) => (
    <button onClick={props.onClick} className={'timer-btn'}>
        <i className={'material-icons'} style={{ fontSize: IconSize }}> {props.icon} </i>
        <span>{props.label} </span>
    </button>
);

export const NextButton = (props: ButtonProps & { label?: string }) => (
    <TimerButton onClick={props.onClick} icon={'skip_next'} label={props.label ? props.label : 'Next'}/>
);

export const BreakButton = (props: ButtonProps) => (
    <TimerButton onClick={props.onClick} icon={'free_breakfast'} label='Break'/>
);

export const FinishButton = (props: ButtonProps) => (
    <TimerButton onClick={props.onClick} icon={'stop'} label='Finish'/>
);

export const ResumeButton = (props: ButtonProps) => (
    <TimerButton onClick={props.onClick} icon={'play_arrow'} label='Resume'/>
);
