import React from 'react';
import { Menu } from "./Menu";

export const AuthorizedPage = (props: {children: JSX.Element | JSX.Element[]}) => {
    return (
        <>
            <Menu/>
            {props.children}
        </>
    );
};
