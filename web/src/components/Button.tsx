import React from 'react';

type ButtonProps = {
    children?: string | JSX.Element;
    onClick?: () => void,
};

export const Button = (props: ButtonProps) => (
    <button className={'btn'} onClick={props.onClick}>{props.children}</button>
);
