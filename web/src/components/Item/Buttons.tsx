import React from 'react';

export const ItemButtons = (props: { relatedItems: {item: string, onClick: () => void}[] }) => {
    return (
        <div className={'item-btns'}>
            <PrevItem item={props.relatedItems[0].item} onClick={props.relatedItems[0].onClick}/>
            <NextItem item={props.relatedItems[1].item} onClick={props.relatedItems[1].onClick}/>
        </div>
    );
};

type BtnProps = {
    item: string,
    onClick: () => void,
}

const NextItem = (props: BtnProps) => (
    <ItemButton item={props.item} onClick={props.onClick}>
        <span>Next</span>
    </ItemButton>
);

const PrevItem = (props: BtnProps) => (
    <ItemButton item={props.item} onClick={props.onClick}>
        <span>Previous</span>
    </ItemButton>
);

const ItemButton = (props: { children: JSX.Element, item: string, onClick: () => void}) => (
    <div className={'item-btn'} onClick={props.onClick}>
        <span className={'item-btn-name'}>{props.item}</span><br/>
        {props.children}
    </div>
);
