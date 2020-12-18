import React from 'react';

type ButtonProps = {
    children?: string | JSX.Element;
    onClick?: () => void,
    className?: string,
};

export const Button = (props: ButtonProps) => (
    <button className={'btn ' + props.className} onClick={props.onClick}>{props.children}</button>
);
