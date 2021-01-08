import React from 'react';
import { TextInput } from "./TextInput";

type UploadProps = {
    image?: string,
    onSetImage: (val: string) => void,
    browseLink?: string,
}

const Placeholder = 'https://staging-music.vodacom.co.za/assets/rich/placeholder_cover.png';

export const ImageLinkInput = (props: UploadProps) => (
    <div className={'flex image-link-input'}>
        <img className={'border-radius border-light'}
             src={props.image ? props.image : Placeholder}
             width={50} height={50}/>
        <TextInput onChange={props.onSetImage} value={props.image}/>
        <a className={'btn browse-btn'} href={props.browseLink} target={'_blank'}>Browse</a>
    </div>
);
