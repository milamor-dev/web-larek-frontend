import {Component} from "../base/Component";
import {IEvents} from "../base/events";

interface IModalData {
    content: HTMLElement;
}

export class Modal extends Component<IModalData> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents)

    set content(value: HTMLElement) 

    open() 

    close() 

    render(data: IModalData): HTMLElement
}