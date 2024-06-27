import {Component} from "./base/Component";
import {EventEmitter} from "./base/events";

interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter) 

    set items(items: HTMLElement[]) 

    set selected(items: string[])

    set total(total: number) 
}