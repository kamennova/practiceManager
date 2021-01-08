import React, { useState } from 'react';

type Option = {
    label: string,
    value: string,
    icon?: string,
};

export const Select = (props: { options: Option[], value?: string, onChange: (v: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const current = props.options.find(o => o.value === props.value);

    const close = () => {
        setIsOpen(false);
        setTimeout(() => document.removeEventListener('click', close), 0);
    };

    const open = () => {
        setIsOpen(true);
        setTimeout(() => document.addEventListener('click', close), 0)
    };

    return (
        <div onClick={isOpen ? close : open} className={'select'}>
            <select className={'visually-hidden'}>
                {props.options.map(o => <option value={o.value} selected={o.value === props.value}>{o.label}</option>)}
            </select>

            <span className={'current-option'}>{current ? <OptionContent {...current}/> : 'Select'}</span>

            {isOpen && <ul style={{zIndex: 9999}}>
                {props.options.map((item) =>
                    <li onClick={() => props.onChange(item.value)}><OptionContent {...item} /></li>)}
            </ul>}

            <i className="material-icons arrow-icon">arrow_drop_down</i>
        </div>
    );
};

const OptionContent = (props: Option) => (
    <span className={'option-content'}>
        {props.icon && <i className={'material-icons'}>{props.icon}</i>}
        <span className={'label'}>{props.label}</span>
    </span>
);
