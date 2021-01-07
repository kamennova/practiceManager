import * as React from "react";
import { useState } from "react";
import { Tip } from "common/types/Tip";
import { LoaderIcon } from "../icons/loader";

type InputProps = {
    name?: string,
    onSelect: (t?: Tip) => void,
    value?: Tip,
    getTips: (i: string) => Promise<Tip[]>,
    allowCreate?: boolean,
}

export const TextInputTips = (props: InputProps) => {
    const [tips, setTips] = useState<Tip[]>([]);
    const [input, setInput] = useState('');
    const [showTips, setShowTips] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [autofocus, setAutofocus] = useState(false); //

    const onChange = (str: string) => {
        setInput(str);
        if (str.length > 1) {
            setShowTips(true);
            loadTips(str);
        } else {
            setShowTips(false);
        }
    };

    const loadTips = async (str: string) => {
        setIsLoading(true);
        const tips = await props.getTips(str);
        setIsLoading(false);
        if (props.allowCreate) {
            setTips([...tips, { label: str, id: 0 }]);
        } else {
            setTips(tips);
        }
    };

    const chooseTip = (id: number) => {
        props.onSelect(tips.find(t => t.id === id));
        setInput('');
        setShowTips(false);
    };

    const clearValue = () => {
        props.onSelect(undefined);
        setAutofocus(true);
    };

    return (
        <div className={'options-input-wrapper'}>
            <div className={'options-input'}>
                <div className={'input'}>
                    {props.value ? <span className={'value'}>
                       <OptionContent {...props.value}/> <button onClick={clearValue} className={'close-btn'}>×</button>
                    </span> :
                        <input name={props.name}
                               type={'text'}
                               value={input}
                               autoFocus={autofocus}
                               onChange={(e) => onChange(e.target.value)}/>}
                </div>

                {showTips && <div className={'container-layer'} onClick={() => setShowTips(false)}/>}
                {showTips && <div className={'tips-container'}>
                    {isLoading ? <LoaderIcon color={'lightgrey'}/> :
                        (props.allowCreate || tips.length > 0) ? <ul className={'tips-list'}>
                                {tips.map(t => <li onClick={() => chooseTip(t.id)}
                                                   className={props.value?.id === t.id ? 'selected' : ''}>
                                   <OptionContent {...t} /></li>)}
                            </ul> :
                            <span className={'no-tips-message'}>Nothing found</span>}
                </div>}
            </div>
            <p className={'input-message'}>Start typing to see tips</p>
        </div>
    );
};

const OptionContent = (props: Tip) => (
    <span className={'option-content'}>
        {props.picSrc && <img width={20} height={20} src={props.picSrc}/>}
        <span className={'label'}>{props.label}</span>
    </span>
);
