import React from 'react';

export const ItemStats = (props: { items: { label: string | number, value: string | number }[] }) => {
    return (
        <div className={'item-stats'}>
            {props.items.map(item => (<div className={'item-statistic'} key={item.label}>
                <span className={'feature-value'}>{item.value.toString()}</span>
                <span className={'feature-label'}>{item.label.toString()}</span>
            </div>))}
        </div>
    );
};
