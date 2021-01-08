import React from "react";

export const ItemSection = (props: { title: string, children: JSX.Element | JSX.Element[] }) => (
    <div className={'item-section main-content'}>
        <h3 className={'section-title'}>{props.title}</h3>
        {props.children}
    </div>
);
