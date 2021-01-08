import React from "react";
import * as ReactDOM from "react-dom";

type ModalProps = { close: () => void, title: string, message?: string };

export class Modal extends React.Component<ModalProps> {
    modalRoot;
    elem: HTMLElement;

    constructor(props: ModalProps) {
        super(props);
        this.modalRoot = document.getElementById('modal-container');
        this.modalRoot?.classList.add('open');

        this.elem = document.createElement('article');
        this.elem.classList.add('modal');

        document.getElementById('modal-bg-layer')?.addEventListener('click', this.props.close);
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
        this.modalRoot?.appendChild(this.elem);
    }

    componentWillUnmount() {
        this.modalRoot?.removeChild(this.elem);
        this.modalRoot?.classList.remove('open');
        document.body.style.overflow = 'unset';
        document.getElementById('modal-bg-layer')?.removeEventListener('click', this.props.close);
    }

    render() {
        return ReactDOM.createPortal((
                <>
                    <h2 className={'modal-title'}>{this.props.title}</h2>
                    <p className={'modal-message'}>{this.props.message}</p>
                    {this.props.children}
                </>
            ),
            this.elem
        );
    }
}
