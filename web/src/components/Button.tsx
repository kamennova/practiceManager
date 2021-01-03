import React from 'react';

type ButtonProps = {
    children?: string | JSX.Element;
    onClick?: () => void,
    className?: string,
    label?: string,
};

export const Button = (props: ButtonProps) => (
    <button className={'btn secondary ' + props.className} onClick={props.onClick}>{props.label || props.children}</button>
);

export const PrimaryButton = (props: ButtonProps) => (
    <button className={'btn primary ' + props.className} onClick={props.onClick}>{props.label || props.children}</button>
);
